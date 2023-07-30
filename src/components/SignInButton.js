import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import { Image } from 'react-native'

const SignInButton = ({ data }) => {

    const signIn = async () => {
        if (data?.type === 'google') {

        }
    }

    return (
        <LoginButton>
            <Image
                source={data?.logo}
                style={{
                    width: "60%",
                    height: "60%"
                }}
            />
        </LoginButton>
    )
}

const LoginButton = styled.TouchableOpacity`
    width: ${wt(450)}px;
    height: ${ht(450)}px;
    border-radius: 10px;
    border-color: ${COLORS.success};
    border-width: 3px;
    justify-content: center;
    align-items: center;
`

export default SignInButton