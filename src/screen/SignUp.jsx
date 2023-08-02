import React, { useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import Loading from '../components/Loading'
import { MotiView } from 'moti'
import CustomText from '../components/CustomText'
import CustomCenterView from '../components/CustomCenterView'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { font, ht, wt } from '../../responsive/responsive'
import SignInput from '../components/input/SignInput'
import SignUpInput from '../components/input/SignUpInput'
import { styled } from 'styled-components'
import CustomButton from '../components/CustomButton'
import { addUser } from '../functions/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SignUp = () => {

    const [userName, setUserName] = useState('');

    const onSignUp = async () => {
        const uid = await AsyncStorage.getItem('uid');

        const postAddUser = await addUser(uid, userName);

        console.log(postAddUser);
    }

    return (
        <CustomSafeAreaView>
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles['header']}
                transition={{
                    duration: 1000
                }}
            >
                <CustomText
                    text={'사용하실 닉네임을 적어주세요'}
                    size={font(20)}
                    type={'Bold'}
                />
                <NameInputView>
                    <SignUpInput
                        value={userName}
                        setValue={setUserName}
                    />
                </NameInputView>
            </MotiView>
            <MotiView
                style={{
                    width: "100%",
                    height: ht(400),
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: wt(30),
                    paddingHorizontal: wt(80)
                }}
                animate={{ translateY: userName.length > 0 ? 0 : 200 }}
            >
                <CustomButton
                    title={'가입하기'}
                    onPress={onSignUp}
                />
            </MotiView>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

const NameInputView = styled.View`
    width: 100%;
    height: ${ht(230)}px;
    padding: 0 ${wt(80)}px;
    margin-top: ${ht(120)}px;
`

const CustomButtonView = styled.View`
    width: 100%;
    height: ${ht(400)}px;
    justify-content: center;
    align-items: center;
    padding: ${wt(30)}px ${wt(80)}px;
`

export default SignUp