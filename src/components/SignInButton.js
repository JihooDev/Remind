import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import { Image } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { firebase } from '@react-native-firebase/auth';
import { FIREBASE_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { getUser } from '../functions/firebase'
import { useRecoilState } from 'recoil'
import { loadingControl } from '../recoil/control'
import { userData } from '../recoil/user'

const SignInButton = ({ data }) => {

    const navigation = useNavigation();
    const [loading, setLoading] = useRecoilState(loadingControl);
    const [userDataBox, setUserDataBox] = useRecoilState(userData);

    const signIn = async () => {
        try {
            if (data?.type === 'google') {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
                const { idToken } = await GoogleSignin.signIn();

                if (idToken) {
                    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                    const res = await auth().signInWithCredential(googleCredential);

                    await AsyncStorage.setItem('uid', res.user.uid);

                    const userCheck = await getUser(res.user.uid, setLoading);

                    if (userCheck.data) {
                        console.log(userCheck);
                        await AsyncStorage.setItem('user', JSON.stringify({ uid: userCheck.data.uid, user_name: userCheck.data.user_name }));
                        await AsyncStorage.setItem('pincode', userCheck.data.pin_code);
                        setUserDataBox({ uid: userCheck.data.uid, user_name: userCheck.data.user_name });
                        navigation.reset({ routes: [{ name: 'Home' }] });
                    } else {
                        navigation.reset({ routes: [{ name: 'SignUp' }] });
                    }
                }
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