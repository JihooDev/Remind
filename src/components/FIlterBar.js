import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import CustomText from './CustomText';
import { COLORS } from '../asset/colors';

const FIlterBar = ({
    data,
    setData,
    updateFuc
}) => {

    const [menuStatus, setMenuStatus] = useState('최신순');
    const [selectStatus, setSelectStatus] = useState('선택');
    const tabMenuList = [
        {
            id: 1,
            title: selectStatus,
        },
        {
            id: 2,
            title: menuStatus
        }
    ]

    return (
        <FilterView>
            {
                tabMenuList.map(({ id, title }) => (
                    <FilterButton
                        activeOpacity={.9}
                    >
                        <CustomText
                            text={title}
                            color={COLORS.white}
                        />
                    </FilterButton>
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
    background-color: red;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.status ? COLORS.red : COLORS.success};
    border-radius: 5px;
`

export default FIlterBar