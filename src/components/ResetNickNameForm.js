import React, { useState } from 'react'
import { styled } from 'styled-components'
import { font, ht, wt } from '../../responsive/responsive'
import CustomText from './CustomText'
import moment from 'moment'
import { COLORS } from '../asset/colors'
import { MotiView } from 'moti'
import CustomButton from './CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollView, TextInput } from 'react-native'
import { createPlan, getUser, resetNicName } from '../functions/firebase'
import uuid from 'react-native-uuid';
import { useRecoilState, useRecoilValue } from 'recoil'
import { userData } from '../recoil/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loadingControl } from '../recoil/control'

const ResetNicNameForm = ({
    closeModal,
    getPlanList
}) => {

    const [name, setName] = useState('');
    const [userDataBox, setUserDataBox] = useRecoilState(userData);
    const [loading, setLoding] = useRecoilState(loadingControl);

    // 닉네임 변경 함수
    const changeNicName = async () => {
        const changeServer = await resetNicName(name);

        if (changeServer['status']) {
            const uid = await AsyncStorage.getItem('uid');

            const changeUser = await getUser(uid, setLoding);

            if (changeUser['status']) {
                setUserDataBox(changeUser['data']);
                closeModal();
            }
        }
    }

    return (
        <>
            <Container>
                <MainHeader>
                    <CustomText
                        text={'변경 하실 닉네임을 입력해주세요'}
                        color={COLORS.white}
                        size={18}
                        type={'Bold'}
                    />
                </MainHeader>
                {/* <KeyboardAwareScrollView
                    style={{
                        paddingHorizontal: wt(40)
                    }}
                > */}
                <CustomInputView>
                    <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        style={{
                            color: COLORS.white,
                            fontSize: font(16),
                            fontFamily: "Pretendard-Medium"
                        }}
                        placeholder={userDataBox?.user_name}
                        placeholderTextColor={COLORS.gray}
                    />
                    <MotiView
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            height: ht(10),
                        }}
                        animate={{
                            backgroundColor: name.length > 0 ? COLORS.success : COLORS.gray
                        }}
                    />
                </CustomInputView>
                {/* </KeyboardAwareScrollView> */}
            </Container>
            <MotiView
                style={{
                    width: "100%",
                    height: ht(400),
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: wt(30),
                    paddingHorizontal: wt(80)
                }}
                animate={{
                    translateY: name.length > 0 ? 0 : 250
                }}
            >
                <CustomButton
                    title={'수정하기'}
                    type='success'
                    onPress={changeNicName}
                />
            </MotiView>
        </>
    )
}

const Container = styled.View`
    flex: 1;
`

const MainHeader = styled.View`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${ht(250)}px;
`

const CustomInputView = styled.View`
    width: 100%;
    height: ${ht(230)}px;
    margin: ${ht(80)}px 0;
    justify-content: center;
`


export default ResetNicNameForm