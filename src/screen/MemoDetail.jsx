import React, { useEffect, useRef, useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { COLORS } from '../asset/colors';
import CustomStatusBar from '../components/CustomStatusBar';
import { useRecoilState } from 'recoil';
import { detailData } from '../recoil/user';
import { styled } from 'styled-components';
import { ht, wt } from '../../responsive/responsive';
import { MotiPressable } from 'moti/interactions';
import { TextInput } from 'react-native';

const MemoDetail = ({ route }) => {

    const [folderData, setFolderData] = useRecoilState(detailData);
    const [noteData, setNoteData] = useState(route.params.data);
    const [editName, setEditName] = useState(false);
    const nameInputRef = useRef();

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
            <CustomStatusBar
                back={true}
                title={folderData.name}
            />
            <MainView>

            </MainView>
        </CustomSafeAreaView>
    )
}

const MainView = styled.View`
    flex: 1;
    padding: ${ht(50)}px ${wt(80)}px;
`

export default MemoDetail