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

const SignUp = () => {

    const [userName, setUserName] = useState('');

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
                    text={'회원님의 이름을 적어주세요'}
                    size={font(20)}
                    type={'Bold'}
                />
                <NameInputView>
                    <SignUpInput
                        value={userName}
                        setValue={setUserName}
                        placeholder={'이름'}
                    />
                </NameInputView>
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

export default SignUp