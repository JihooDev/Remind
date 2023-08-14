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
import { createPlan } from '../functions/firebase'

const CreatePlanForm = ({
    selected,
    closeModal
}) => {

    const [planName, setPlanName] = useState('');

    // 계획을 저장하는 함수
    const postUserPlan = async () => {
        const postData = {
            date_created: moment().unix(),
            date: selected,
            plan_name: planName
        }

        const postServer = await createPlan(postData);

        if (postServer['status']) {
            closeModal();
        }
    }

    return (
        <>
            <Container>
                <MainHeader>
                    <CustomText
                        text={`${moment(selected).format('YYYY년 MM월 DD일 의 계획 추가')}`}
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
                        value={planName}
                        onChangeText={text => setPlanName(text)}
                        style={{
                            color: COLORS.white,
                            fontSize: font(16),
                            fontFamily: "Pretendard-Medium"
                        }}
                        placeholder="어떤 계획이신가요?"
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
                            backgroundColor: planName.length > 0 ? COLORS.success : COLORS.gray
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
                    translateY: planName.length > 0 ? 0 : 250
                }}
            >
                <CustomButton
                    title={'추가하기'}
                    type='success'
                    onPress={postUserPlan}
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


export default CreatePlanForm