import React, { useCallback, useEffect, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors'
import { useRecoilState } from 'recoil'
import { detailData } from '../recoil/user'
import HeaderBar from '../components/HeaderBar'
import CustomStatusBar from '../components/CustomStatusBar'
import { styled } from 'styled-components'
import CustomText from '../components/CustomText'
import { MotiView } from 'moti'
import { ht, wt } from '../../responsive/responsive'
import { ICON } from '../asset/asset'
import { FlatList, Image } from 'react-native'
import MemoList from '../components/MemoList'
import { getRefleshMemoData } from '../functions/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import FIlterBar from '../components/FIlterBar'

const FolderDetail = ({ navigation: { push } }) => {

    const [pageData, setPageData] = useRecoilState(detailData);
    const [contentList, setContentList] = useState(pageData?.content);
    const [menuStatus, setMenuStatus] = useState(false); // false 최신 순 | true 오래된 순
    const [selectStatus, setSelectStatus] = useState(false);
    const [tabSideMenu, setTabSideMenu] = useState(false);
    const [selectContent, setSelectContent] = useState([]);

    useFocusEffect(
        useCallback(() => {
            getMemoData();
        }, [])
    )

    // 메모 데이터를 가져오는 함수
    const getMemoData = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const reflashData = await getRefleshMemoData(pageData.id, uid);

        if (reflashData['status']) {
            setContentList(reflashData['data'].content);
        }
    }

    // 필터 탭을 클릭했을 때 동작하는 함수
    const statusTabBarAction = (type) => {
        switch (type) {
            case "select":
                setSelectStatus(true);
                return setTabSideMenu(true);
            case "filter":
                dateFilter();
                return setMenuStatus(!menuStatus);
            case "none_select":
                setSelectStatus(false);
                return setTabSideMenu(false);
        }
    }

    // 최신/오래된 순 정렬
    const dateFilter = () => {
        if (menuStatus) {
            setContentList(contentList.sort((a, b) => {
                return b.date_created - a.date_created;
            }))
        } else {
            setContentList(contentList.sort((a, b) => {
                return a.date_created - b.date_created;
            }))
        }
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                title={pageData?.name}
                back={true}
            />
            {
                contentList.length > 0 &&
                <FIlterBar
                    setData={setContentList}
                    data={contentList}
                    updateFuc={getMemoData}
                    menuStatus={menuStatus}
                    selectStatus={selectStatus}
                    statusTabBarAction={statusTabBarAction}
                    tabSideMenu={tabSideMenu}
                    selectContent={selectContent}
                />
            }
            {
                contentList?.length > 0
                    ?
                    <>
                        <FlatList
                            data={contentList}
                            style={{ paddingHorizontal: wt(50), paddingTop: ht(80) }}
                            renderItem={(item) => { return <MemoList item={item.item} selectStatus={selectStatus} /> }}
                            keyExtractor={(item) => item.id}
                        />
                        <MotiView
                            from={{ opacity: 0, translateY: 50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={1000}
                            style={{
                                marginTop: ht(80)
                            }}
                        >
                            <PlusButton
                                activeOpacity={.9}
                                style={{ position: "absolute", bottom: wt(350), right: wt(100), zIndex: 998 }}
                                onPress={() => push('AddNote')}
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
                    </>
                    :
                    <NoContentView>
                        <MotiView
                            from={{ opacity: 0, translateY: -50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={500}
                        >
                            <CustomText
                                text={'내용을 추가해보세요!'}
                                color={COLORS.gray}
                                size={17}
                            />
                        </MotiView>
                        <MotiView
                            from={{ opacity: 0, translateY: 50 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            delay={1000}
                            style={{
                                marginTop: ht(80)
                            }}
                        >
                            <PlusButton
                                activeOpacity={.9}
                                onPress={() => push('AddNote')}
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
                    </NoContentView>
            }
        </CustomSafeAreaView>
    )
}

const NoContentView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const PlusButton = styled.TouchableOpacity`
    width: ${wt(300)}px;
    height: ${ht(300)}px;
    background-color: #CC4F4F;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
`

export default FolderDetail