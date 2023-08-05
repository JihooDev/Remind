import React, { useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../asset/colors';
import CustomStatusBar from '../components/CustomStatusBar';
import CustomTextInput from '../components/CustomTextInput';
import SignInput from '../components/input/SignInput';
import { styled } from 'styled-components';
import { font, ht, wt } from '../../responsive/responsive';
import { TextInput } from 'react-native';
import { MotiView } from 'moti';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import { useRecoilState } from 'recoil';
import { loadingControl } from '../recoil/control';
import { createFolderPost } from '../functions/firebase';
import uuid from 'react-native-uuid';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFolder = ({ navigation: { reset } }) => {

    const [folderName, setFolderName] = useState('');
    const [security, setSecurity] = useState(false);
    const [loading, setLoading] = useRecoilState(loadingControl);

    const createFolder = async () => {
        const uid = await AsyncStorage.getItem('uid');
        const postData = {
            id: uuid.v4(),
            name: folderName,
            security: security,
            date_created: moment().unix(),
            content: []
        }

        const createFolderData = await createFolderPost(uid, postData, setLoading);

        if (createFolderData.status) {
            reset({ routes: [{ name: "Home" }] })
        }
    }

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                back={true}
                title={'폴더 생성'}
            />
            <MainView>
                <FolderTextInput>
                    <TextInput
                        value={folderName}
                        onChangeText={text => setFolderName(text)}
                        placeholder='폴더의 이름을 적어주세요.'
                        placeholderTextColor={COLORS.gray}
                        style={{
                            color: COLORS.white,
                            fontSize: font(16),
                            fontFamily: "Pretendard-Medium"
                        }}
                    />
                    <MotiView
                        style={{
                            width: "100%",
                            height: ht(10),
                            position: "absolute",
                            bottom: 0
                        }}
                        animate={{ backgroundColor: folderName.length > 0 ? COLORS.success : COLORS.white }}
                    />
                </FolderTextInput>
                <SelectView>
                    <CustomText
                        text={'폴더를 잠구시겠어요?'}
                        color={COLORS.gray}
                    />
                    <CheckBoxView>
                        <CheckListView
                            checked={security ? true : false}
                            activeOpacity={.8}
                            onPress={() => setSecurity(true)}
                        >
                            <CustomText
                                text={'네'}
                                color={COLORS.white}
                            />
                        </CheckListView>
                        <CheckListView
                            checked={!security ? true : false}
                            activeOpacity={.8}
                            onPress={() => setSecurity(false)}
                        >
                            <CustomText
                                text={'아니요 괜찮아요'}
                                color={COLORS.white}
                            />
                        </CheckListView>
                    </CheckBoxView>
                </SelectView>
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
                animate={{ translateY: folderName.length > 0 ? 0 : 200 }}
            >
                <CustomButton
                    title={'생성하기'}
                    type='success'
                    onPress={createFolder}
                />
            </MotiView>
        </CustomSafeAreaView>
    )
}

const InputBox = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    justify-content: center;
    background-color: ${COLORS.white};
    border-radius: 8px;
    padding: 0 ${wt(50)}px;
`

const MainView = styled.View`
    flex: 1;
    padding: 0 ${wt(70)}px;
    padding-top: ${ht(100)}px;
`

const FolderTextInput = styled.View`
    width: 100%;
    height: ${ht(250)}px;
    justify-content: center;
`

const SelectView = styled.View`
    width: 100%;
    height: ${ht(280)}px;
    margin-top: ${ht(120)}px;
    justify-content: space-between;
`

const CheckBoxView = styled.View`
    width: 100%;
    height: ${ht(150)}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const CheckListView = styled.TouchableOpacity`
    width: 45%;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.checked ? COLORS.success : COLORS.gray};
    border-radius: 5px;
`

export default AddFolder