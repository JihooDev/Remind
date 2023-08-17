import React, { useEffect, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { styled } from 'styled-components'
import { font, ht, wt } from '../../responsive/responsive'
import CustomCenterView from '../components/CustomCenterView'
import CustomText from '../components/CustomText'
import { MotiView } from 'moti'
import { Image } from 'react-native'
import { ICON, IMAGE } from '../asset/asset'
import SignInButton from '../components/SignInButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { firebase } from '@react-native-firebase/auth'
import { GOOGLE_CLIENT_ID } from '@env';
import { initConfig } from '../functions/init'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRecoilState } from 'recoil'
import { userData } from '../recoil/user'
import { COLORS } from '../asset/colors'
import jwtDecode from 'jwt-decode'
import appleAuth, {
    AppleButton,
    AppleAuthRequestScope,
    AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import { loadingControl } from '../recoil/control'
import { getUser } from '../functions/firebase'

const Splash = ({ navigation: { reset } }) => {

    const [userDataBox, setUserDataBox] = useRecoilState(userData);
    const [loading, setLoading] = useRecoilState(loadingControl);
    const [checkUid, setCheckUid] = useState(false);

    useEffect(() => {
        userCheck();
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID
        })
    }, [])

    useEffect(() => {
        // Apple 로그인 초기화
        appleAuth.onCredentialRevoked(async () => {
            console.warn('Apple credential revoked');
        });
    }, []);

    const loginData = [
        {
            type: 'google',
            logo: ICON.google
        }
    ]

    // 유저가 로그인이 이미 되어있는지 체크하는 함수
    const userCheck = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const user = await AsyncStorage.getItem('user');

        if (user) {
            setCheckUid(true);

            setUserDataBox(JSON.parse(user));

            setTimeout(() => {
                reset({ routes: [{ name: "Home" }] })
            }, 2000)
        } else if (uid) {
            setCheckUid(false);
        }
    }

    // 애플 로그인
    const onAppleButtonPress = async () => {
        try {
            // 로그인 요청 설정
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
            });

            // 로그인 성공 시 처리
            if (appleAuthRequestResponse.identityToken) {
                console.log('Apple 로그인 성공');
                console.log('Identity Token:', appleAuthRequestResponse.identityToken);
                const decodeData = jwtDecode(appleAuthRequestResponse.identityToken);

                console.log(decodeData['sub'], 'uid');

                await AsyncStorage.setItem('uid', decodeData['sub']);
                const userCheck = await getUser(decodeData['sub'], setLoading);

                if (userCheck.data) {
                    await AsyncStorage.setItem('user', JSON.stringify({ uid: userCheck.data.uid, user_name: userCheck.data.user_name }));
                    await AsyncStorage.setItem('pincode', userCheck.data.pin_code);
                    setUserDataBox({ uid: userCheck.data.uid, user_name: userCheck.data.user_name });
                    reset({ routes: [{ name: 'Home' }] });
                } else {
                    reset({ routes: [{ name: 'SignUp' }] });
                }

            }
        } catch (error) {
            if (error.code === 'APPLE_AUTH_ERROR.CANCELED') {
                console.warn('사용자가 Apple 로그인을 취소했습니다.');
            } else {
                console.error('Apple 로그인 오류:', error);
            }
        }
    };

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <MotiView
                from={{ opacity: 0, translateY: !checkUid ? ht(800) : ht(200) }}
                animate={{ opacity: 1, translateY: ht(200) }}
                style={{ width: "100%", height: "20%", justifyContent: "center", alignItems: "center" }}
            >
                <CustomText
                    text={'모든 순간을'}
                    type={'Bold'}
                    size={font(25)}
                    color={COLORS.white}
                />
                <CustomText
                    text={'기록 해보세요'}
                    type={'Bold'}
                    size={font(25)}
                    color={COLORS.white}
                />
            </MotiView>
            <BottomLoginView>
                {
                    !checkUid
                        ?
                        loginData?.map(item => (
                            <SignInButton
                                key={item?.type}
                                data={item}
                            />
                        ))
                        : null
                }
                {
                    !checkUid
                        ?
                        <AppleButton
                            style={{ width: wt(350), height: ht(350) }}
                            cornerRadius={10}
                            buttonStyle={AppleButton.Style.WHITE}
                            buttonType={AppleButton.Type.CONTINUE}
                            onPress={() => onAppleButtonPress()}
                        />
                        : null
                }
            </BottomLoginView>
            <TopView>
                <CustomCenterView backColor={COLORS.black}>
                    <MotiView style={{ width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                        <Image
                            source={IMAGE.main}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </MotiView>
                </CustomCenterView>
            </TopView>
        </CustomSafeAreaView>
    )
}

const TopView = styled.View`
    flex: 1;
`

const BottomLoginView = styled.View`
    width: 100%;
    height: ${ht(800)}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${wt(120)}px;
`

export default Splash