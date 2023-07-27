import React from 'react'
import { styled } from 'styled-components'
import { ht } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'

const HeaderBar = () => {
    return (
        <Header>

        </Header>
    )
}

const Header = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    background-color: ${COLORS.white};
`

export default HeaderBar