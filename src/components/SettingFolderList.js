import React from 'react'
import { styled } from 'styled-components'
import { ht } from '../../responsive/responsive'

const SettingFolderList = () => {
    return (
        <ListView></ListView>
    )
}

const ListView = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    background-color: red;
`

export default SettingFolderList