import React, { useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { styled } from 'styled-components'
import { font, ht, wt } from '../../responsive/responsive'
import { TextInput } from 'react-native'
import { MotiView, ScrollView } from 'moti'

const AddNote = ({ navigation: { pop } }) => {

    const [memoName, setMemoName] = useState('');
    const [content, setContent] = useState('');

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                title={'메모 추가'}
                back={true}
            />
            <MainView>
                <CustomInputView>
                    <TextInput
                        value={memoName}
                        onChangeText={text => setMemoName(text)}
                        style={{
                            color: COLORS.white,
                            fontSize: font(16),
                            fontFamily: "Pretendard-Medium"
                        }}
                        placeholder="메모의 이름을 입력해주세요"
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
                            backgroundColor: memoName.length > 0 ? COLORS.success : COLORS.gray
                        }}
                    />
                </CustomInputView>
                <MotiView
                    style={{
                        width: "100%",
                        height: ht(1400),
                        borderRadius: 15,
                        borderWidth: ht(10),
                        padding: ht(50)
                    }}
                    animate={{
                        borderColor: content.length > 0 ? COLORS.success : COLORS.gray
                    }}
                >
                    <ScrollView>
                        <TextInput
                            style={{
                                width: "100%",
                                fontSize: font(16),
                                color: COLORS.white
                            }}
                            multiline={true}
                            value={content}
                            onChangeText={text => setContent(text)}
                        />
                    </ScrollView>
                </MotiView>
            </MainView>
        </CustomSafeAreaView>
    )
}

const MainView = styled.View`
    flex: 1;
    padding: 0 ${wt(80)}px;
`

const CustomInputView = styled.View`
    width: 100%;
    height: ${ht(230)}px;
    margin: ${ht(80)}px 0;
    justify-content: center;
`


export default AddNote