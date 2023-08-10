import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import CustomText from './CustomText';
import { COLORS } from '../asset/colors';
import { MotiView } from 'moti';

const FIlterBar = ({
    data,
    setData,
    updateFuc,
    selectStatus,
    menuStatus,
    statusTabBarAction,
    tabSideMenu,
    selectContent
}) => {

    const tabMenuList = [
        {
            id: 1,
            title: selectStatus ? '전체선택' : '선택하기',
            type: selectStatus ? "select_all" : "select"
        },
        {
            id: 2,
            title: menuStatus,
            type: "filter"
        }
    ]

    // 탭 메뉴를 상태에 따라 리턴하는 함수
    const tabMenuRenderItem = () => {
        if (!tabSideMenu) {
            return [
                {
                    id: 1,
                    title: selectStatus ? '전체선택' : '선택하기',
                    type: selectStatus ? "select_all" : "select",
                    color: COLORS.main
                },
                {
                    id: 2,
                    title: menuStatus,
                    type: "filter",
                    color: COLORS.main
                }
            ]
        } else {
            return [
                {
                    id: 1,
                    title: selectContent.length > 0
                        ? `${selectContent.length}개`
                        : '취소',
                    type: selectContent.length === 0 && 'none_select',
                    color: selectContent.length === 0 ? COLORS.gray : COLORS.red
                },
                {
                    id: 2,
                    title: "삭제하기",
                    type: "delete",
                    color: COLORS.red
                }
            ]
        }
    }

    return (
        <FilterView>
            {
                tabMenuRenderItem().map(({ id, title, type, color }) => (
                    <MotiView
                        from={{ translateX: id % 2 === 0 ? 200 : -200, opacity: 0 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        delay={1500}
                    >
                        <FilterButton
                            activeOpacity={.9}
                            onPress={() => statusTabBarAction(type)}
                            color={color}
                        >
                            <CustomText
                                text={title}
                                color={COLORS.white}
                            />
                        </FilterButton>
                    </MotiView>
                ))
            }
        </FilterView>
    )
}

const FilterView = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    padding: 0 ${wt(50)}px;
    margin-top: ${ht(80)}px;
    flex-direction: row;
    justify-content: space-between;
`

const FilterButton = styled.TouchableOpacity`
    width: ${wt(350)}px;
    height: ${ht(130)}px;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.color};
    border-radius: 5px;
`

export default FIlterBar