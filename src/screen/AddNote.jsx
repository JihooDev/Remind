import React, { useEffect, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import { COLORS } from '../asset/colors'
import CustomStatusBar from '../components/CustomStatusBar'
import { styled } from 'styled-components'
import { font, ht, wt } from '../../responsive/responsive'
import { TextInput } from 'react-native'
import { MotiView, ScrollView } from 'moti'
import CustomButton from '../components/CustomButton'
import { useRecoilState } from 'recoil'
import { detailData } from '../recoil/user'
import { createMemoPost } from '../functions/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import uuid from 'react-native-uuid'

const AddNote = ({ navigation: { pop } }) => {

    const [memoName, setMemoName] = useState('');
    const [content, setContent] = useState('');
    const [pageData, setPageData] = useRecoilState(detailData);

    // 메모를 생성하는 함수
    const createMemo = async () => {
        const valueData = {
            name: memoName,
            date_created: moment().unix(),
            content: content,
            id: uuid.v4()
        }
        const uid = await AsyncStorage.getItem('uid');
        const postData = await createMemoPost(pageData.id, uid, valueData);
    }

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
                                color: COLORS.white,
                                fontFamily: "Pretendard-Medium"
                            }}
                            multiline={true}
                            value={content}
                            onChangeText={text => setContent(text)}
                            placeholder='기록 하실 내용을 입력해주세요'
                            placeholderTextColor={COLORS.gray}
                        />
                    </ScrollView>
                </MotiView>
            </MainView>
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
                    translateY: content.length > 0 && memoName.length > 0
                        ? 0
                        : 200
                }}
            >
                <CustomButton
                    title={'추가하기'}
                    type='success'
                    onPress={createMemo}
                />
            </MotiView>
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