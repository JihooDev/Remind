import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ICON } from '../asset/asset';
import { ht, wt } from '../../responsive/responsive';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import CustomText from '../components/CustomText';
import CustomCenterView from '../components/CustomCenterView';
import { useRecoilState } from 'recoil';
import { test } from '../recoil/test';
import { loadingControl, modalOpen } from '../recoil/control';
import AlertModal from '../components/modal/AlertModal';
import { COLORS } from '../asset/colors';
import HeaderBar from '../components/HeaderBar';
import { MotiView } from 'moti';
import Banner from '../components/Banner';
import { styled } from 'styled-components';
import { getUser } from '../functions/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';
import FolderList from '../components/FolderList';
import PinCodeModal from '../components/modal/PinCodeModal';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {

    const [recoilTest, setRecoilTest] = useRecoilState(test);
    const [modal, setModal] = useRecoilState(modalOpen);
    const [folderData, setFolderData] = useState([]);
    const [loading, setLoading] = useRecoilState(loadingControl);
    const { push, reset } = navigation;

    useFocusEffect(
        useCallback(() => {
            getFolder();
        }, [])
    )

    const getFolder = async () => {
        const uid = await AsyncStorage.getItem('uid');

        const folder = await getUser(uid, setLoading);


        setFolderData(folder.data['folder'])
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            {
                loading && <Loading />
            }
            <HeaderBar />
            {
                folderData.length === 0
                    ?
                    <CustomCenterView
                        backColor={COLORS.black}
                    >
                        <MotiView
                            from={{ opacity: 0, translateY: -50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={1000}
                        >
                            <CustomText
                                text={'폴더를 추가 해보세요!'}
                                color={COLORS.gray}
                                size={17}
                            />
                        </MotiView>
                        <MotiView
                            from={{ opacity: 0, translateY: 50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={1500}
                            style={{
                                marginTop: ht(80)
                            }}
                        >
                            <PlusButton
                                activeOpacity={.9}
                                onPress={() => push('AddFolder')}
                            >
                                <Image
                                    source={ICON.plus}
                                    style={{
                                        tintColor: COLORS.white,
                                        width: wt(100),
                                        height: ht(100)
                                    }}
                                />
                            </PlusButton>
                        </MotiView>
                    </CustomCenterView>
                    :
                    <CustomCenterView backColor={COLORS.black}>
                        <FlatList
                            data={folderData}
                            renderItem={item => { return <FolderList item={item} /> }}
                            style={{
                                width: "100%",
                                paddingHorizontal: wt(50),
                                marginBottom: ht(300)
                            }}
                        />
                    </CustomCenterView>
            }
            {
                folderData?.length > 0 &&
                <MotiView
                    style={{
                        position: "absolute",
                        bottom: ht(300),
                        right: wt(50),
                        width: wt(260),
                        height: ht(260),
                        zIndex: 998
                    }}
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    delay={1000}
                >
                    <AddFolderButton
                        activeOpacity={.9}
                        onPress={() => push('AddFolder')}
                    >
                        <Image
                            source={ICON.plus}
                            style={{
                                tintColor: COLORS.white,
                                width: wt(100),
                                height: ht(100)
                            }}
                        />
                    </AddFolderButton>
                </MotiView>
            }

        </CustomSafeAreaView>
    )
}

const PlusButton = styled.TouchableOpacity`
    width: ${wt(300)}px;
    height: ${ht(300)}px;
    background-color: #CC4F4F;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`

const AddFolderButton = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${COLORS.red};
    border-radius: 15px;
`

export default Home