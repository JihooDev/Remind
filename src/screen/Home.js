import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ICON } from '../asset/asset';
import { ht, wt } from '../../responsive/responsive';
import CustomSafeAreaView from '../components/CustomSafeAreaView';
import CustomText from '../components/CustomText';
import CustomCenterView from '../components/CustomCenterView';
import { useRecoilState } from 'recoil';
import { test } from '../recoil/test';
import { modalOpen } from '../recoil/control';
import AlertModal from '../components/modal/AlertModal';
import { COLORS } from '../asset/colors';
import HeaderBar from '../components/HeaderBar';
import { MotiView } from 'moti';
import Banner from '../components/Banner';

const Home = () => {

    const [recoilTest, setRecoilTest] = useRecoilState(test);
    const [modal, setModal] = useRecoilState(modalOpen);

    return (
        <CustomSafeAreaView backColor={COLORS.white}>
            <HeaderBar />
            <Banner />
        </CustomSafeAreaView>
    )
}

export default Home