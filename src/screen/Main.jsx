import React from 'react'
import { SafeAreaView } from 'react-native'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'
import HeaderBar from '../components/HeaderBar'

const Main = () => {
    return (
        <CustomSafeAreaView>
            <HeaderBar />
        </CustomSafeAreaView>
    )
}

export default Main