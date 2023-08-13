import React, { useEffect, useRef, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors';
import CustomStatusBar from '../components/CustomStatusBar';
import { useRecoilState } from 'recoil';
import { detailData } from '../recoil/user';
import { styled } from 'styled-components';
import { font, ht, wt } from '../../responsive/responsive';
import { MotiPressable } from 'moti/interactions';
import { TextInput, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MotiView } from 'moti';
import CustomButton from '../components/CustomButton';
import moment from 'moment';
import { editMemoPost } from '../functions/firebase';

const MemoDetail = ({ route, navigation: { pop } }) => {

    const [folderData, setFolderData] = useRecoilState(detailData);
    const [noteData, setNoteData] = useState(route.params.data);
    const [editName, setEditName] = useState(noteData.name);
    const [editContent, setEditContent] = useState(noteData.content);

    const postEditFuc = async () => {
        const valueData = {
            ...noteData,
            content: editContent,
            name: editName,
            edit_time: moment().format('YYYY-MM-DD hh:mm')
        }

        const postServer = await editMemoPost(folderData.id, valueData);

        if (postServer['status']) {
            pop();
        }
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                back={true}
                title={folderData.name}
            />
            <MainView>
                <KeyboardAwareScrollView>
                    <CustomInputView>
                        <TextInput
                            value={editName}
                            onChangeText={text => setEditName(text)}
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
                                backgroundColor: editName.length > 0 ? COLORS.success : COLORS.gray
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
                            borderColor: editContent.length > 0 ? COLORS.success : COLORS.gray
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
                                value={editContent}
                                onChangeText={text => setEditContent(text)}
                                placeholder='기록 하실 내용을 입력해주세요'
                                placeholderTextColor={COLORS.gray}
                            />
                        </ScrollView>
                    </MotiView>
                </KeyboardAwareScrollView>
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
                    translateY:
                        editName.length > 0 &&
                            editContent.length > 0 &&
                            (noteData.name !== editName || noteData.content !== editContent)
                            ? 0
                            : 200
                }}
            >
                <CustomButton
                    title={'수정하기'}
                    type='success'
                    onPress={postEditFuc}
                />
            </MotiView>
        </CustomSafeAreaView>
    )
}

const MainView = styled.View`
    flex: 1;
    padding: ${ht(50)}px ${wt(80)}px;
`

const CustomInputView = styled.View`
    width: 100%;
    height: ${ht(230)}px;
    margin: ${ht(80)}px 0;
    justify-content: center;
`


export default MemoDetail