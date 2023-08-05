import React, { useState } from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../asset/colors';

const AddFolder = () => {

    const [folderName, setFolderName] = useState('');
    const [folderType, setFolderType] = useState('');

    return (
        <CustomSafeAreaView backColor={COLORS.black}>
        </CustomSafeAreaView>
    )
}

export default AddFolder