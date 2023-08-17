import React, { useCallback, useEffect, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { deleteFolder, getUser, lockFolder } from '../functions/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'
import { loadingControl, pinCodeState } from '../recoil/control'
import { userData } from '../recoil/user'
import { useFocusEffect } from '@react-navigation/native'
import { styled } from 'styled-components'
import { wt } from '../../responsive/responsive'
import { FlatList } from 'react-native'
import SettingFolderList from '../components/SettingFolderList'
import Loading from '../components/Loading'
import PinCodeModal from '../components/modal/PinCodeModal'
import CustomText from '../components/CustomText'

const FolderSetting = () => {

    const [userDataBox, setUserDataBox] = useRecoilState(userData);
    const [loading, setLoading] = useRecoilState(loadingControl);
    const [folderList, setFolderList] = useState([]);
    const [modalState, setModalState] = useRecoilState(pinCodeState);

    useFocusEffect(
        useCallback(() => {
            getFolderList();
        }, [])
    )

    // 폴더를 가져오는 함수
    const getFolderList = async () => {
        const uid = await AsyncStorage.getItem('uid');

        const folderData = await getUser(uid, setLoading);

        if (folderData['status']) {
            setUserDataBox(folderData['data']);
            setFolderList(folderData['data']['folder']);
        }
    }

    // 잠금을 설정/해제하는 함수
    const folderLockFuc = async (value, id) => {
        const postServer = await lockFolder(value, id);

        if (postServer['status']) {
            getFolderList();
        }
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>

            {loading && <Loading />}
            <CustomStatusBar
                back={true}
                title={'폴더 관리'}
            />
            <Container>
                {
                    folderList.length > 0
                        ?
                        <FlatList
                            data={folderList}
                            renderItem={item => <SettingFolderList item={item.item} folderLockFuc={folderLockFuc} getFolderList={getFolderList} />}
                        />
                        :
                        <NoFolderView>
                            <CustomText
                                text={'사용중인 폴더가 없습니다'}
                                color={COLORS.gray}
                                size={20}
                            />
                        </NoFolderView>
                }
            </Container>
        </CustomSafeAreaView>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 0 ${wt(80)}px;
`

const NoFolderView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export default FolderSetting