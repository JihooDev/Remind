import React from 'react'
import { SafeAreaView } from 'react-native'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import CustomText from '../components/CustomText'

const Main = () => {
    return (
        <CustomSafeAreaView>
            <CustomText text={'Main'} />
        </CustomSafeAreaView>
    )
}

export default Main