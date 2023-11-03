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
import { FlatList, Image, TouchableOpacity } from 'react-native'
import MemoList from '../components/MemoList'
import { deleteMemo, getRefleshMemoData } from '../functions/firebase'
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

            return () => {
                setMenuStatus(false);
                setSelectStatus(false);
                setTabSideMenu(false);
                setSelectContent([]);
            }
        }, [])
    )

    // 메모 데이터를 가져오는 함수
    const getMemoData = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const reflashData = await getRefleshMemoData(pageData.id, uid);

        if (reflashData['status']) {
            const memoDataArr = reflashData['data'].content;
            setContentList(reflashData['data'].content.sort((a, b) => { return b.date_created - a.date_created }));
        }
    }

    // 필터 탭을 클릭했을 때 동작하는 함수
    const statusTabBarAction = async (type) => {
        if (type !== 'delete') {
            switch (type) {
                case "select":
                    setSelectStatus(true);
                    return setTabSideMenu(true);
                case "filter":
                    dateFilter();
                    return setMenuStatus(!menuStatus);
                case "none_select":
                    setSelectStatus(false);
                    setSelectContent([]);
                    return setTabSideMenu(false);
                case "select_all":
                    return setSelectContent(contentList);
            }
        } else if (type === 'delete') {
            deleteMultipleData(pageData.id);
        }
    }

    // 여러개의 데이터를 삭제
    const deleteMultipleData = async (pageId) => {
        let contentIdArr = [];

        selectContent.forEach(item => {
            contentIdArr.push(item.id);
        })

        const deleteFuc = await deleteMemo(pageId, contentIdArr);

        if (deleteFuc['status']) {
            setContentList([]);
            setTabSideMenu(false);
            setSelectStatus(false);
            await getMemoData();
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

    // 메모를 선택했을 시 배열에 추가/제거 하는 함수
    const selectMemoAction = item => {
        const checkData = selectContent.filter(arrItem => arrItem.id === item.id);

        if (checkData.length > 0) {
            setSelectContent(selectContent.filter(arrItem => arrItem.id !== item.id));
        } else {
            setSelectContent([...selectContent, item]);
        }
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                title={pageData?.name}
                back={true}
            >
                <TouchableOpacity
                    activeOpacity={.8}
                >
                    <Image
                        source={ICON.share}
                        style={{ width: wt(120) }}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </CustomStatusBar>
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
                            renderItem={(item) => {
                                return <MemoList
                                    item={item.item}
                                    selectStatus={selectStatus}
                                    selectMemoAction={selectMemoAction}
                                    selectContent={selectContent}
                                />
                            }}
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