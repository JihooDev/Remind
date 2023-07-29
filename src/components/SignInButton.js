import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'

const SignInButton = () => {
    return (
        <LoginButton></LoginButton>
    )
}

const LoginButton = styled.TouchableOpacity`
    width: ${wt(450)}px;
    height: ${ht(450)}px;
    border-radius: 10px;
    border-color: ${COLORS.main};
    border-width: 3px;
`

export default SignInButton