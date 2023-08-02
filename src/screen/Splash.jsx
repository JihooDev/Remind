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

const Splash = ({ navigation: { reset } }) => {

    const [checkUid, setCheckUid] = useState(false);

    useEffect(() => {
        userCheck();
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID
        })
    }, [])

    const loginData = [
        {
            type: 'google',
            logo: ICON.google
        }
    ]

    const userCheck = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const user = await AsyncStorage.getItem('user');

        if (user) {
            setCheckUid(true);

            setTimeout(() => {
                reset({ routes: [{ name: "Home" }] })
            }, 2000)
        } else if (uid) {
            setCheckUid(true);

            setTimeout(() => {
                reset({ routes: [{ name: "SignUp" }] })
            }, 2000)
        }
    }

    return (
        <CustomSafeAreaView>
            <MotiView
                from={{ opacity: 0, translateY: !checkUid ? ht(800) : ht(200) }}
                animate={{ opacity: 1, translateY: checkUid ? ht(200) : ht(800) }}
                style={{ width: "100%", height: "20%", justifyContent: "center", alignItems: "center" }}
            >
                <CustomText
                    text={'당신의'}
                    type={'Bold'}
                    size={font(25)}
                />
                <CustomText
                    text={'생각을 보관하세요'}
                    type={'Bold'}
                    size={font(25)}
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
            </BottomLoginView>
            <TopView>
                <CustomCenterView>
                    <MotiView style={{ width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                        <Image
                            source={IMAGE.main}
                            style={{
                                width: "100%",
                                height: "100%"
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