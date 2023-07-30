import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import { Image } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

const SignInButton = ({ data }) => {

    const signIn = async () => {
        try {
            if (data?.type === 'google') {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                const { idToken } = await GoogleSignin.signIn();

                console.log(idToken);
            }
        } catch (error) {
            console.error(error, 'google 로그인 에러');
        }
    }

    return (
        <LoginButton
            onPress={signIn}
        >
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
    width: ${wt(350)}px;
    height: ${ht(350)}px;
    border-radius: 10px;
    border-color: ${COLORS.success};
    border-width: 3px;
    justify-content: center;
    align-items: center;
`

export default SignInButton