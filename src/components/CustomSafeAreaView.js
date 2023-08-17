import React from 'react'
import { SafeAreaView } from 'react-native'

// flex 1 이 기본적으로 들어가있는 SafeAreaView
const CustomSafeAreaView = ({ children, backColor = "#fff" }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: backColor }}>
            {children}
        </SafeAreaView>
    )
}

export default CustomSafeAreaView