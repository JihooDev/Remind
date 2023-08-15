import React, { useCallback, useEffect, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { getUser } from '../functions/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'
import { loadingControl } from '../recoil/control'
import { userData } from '../recoil/user'
import { useFocusEffect } from '@react-navigation/native'
import { styled } from 'styled-components'
import { wt } from '../../responsive/responsive'
import { FlatList } from 'react-native'
import SettingFolderList from '../components/SettingFolderList'

const FolderSetting = () => {

    const [userDataBox, setUserDataBox] = useRecoilState(userData);
    const [loading, setLoading] = useRecoilState(loadingControl);
    const [folderList, setFolderList] = useState([]);

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

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                back={true}
                title={'폴더 관리'}
            />
            <Container>
                <FlatList
                    data={folderList}
                    renderItem={item => <SettingFolderList item={item.item} />}
                />
            </Container>
        </CustomSafeAreaView>
    )
}

const Container = styled.View`
    flex: 1;
    padding: 0 ${wt(80)}px;
`

export default FolderSetting