import React, { useState } from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'

const FIlterBar = ({
    data,
    setData,
    updateFuc
}) => {

    const [menuStatus, setMenuStatus] = useState('최신순');

    return (
        <FilterView></FilterView>
    )
}

const FilterView = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    background-color: red;
    padding: 0 ${wt(50)}px;
`

export default FIlterBar