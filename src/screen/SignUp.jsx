import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import Loading from '../components/Loading'
import { MotiView } from 'moti'
import CustomText from '../components/CustomText'
import CustomCenterView from '../components/CustomCenterView'
import { StyleSheet } from 'react-native'
import { font, ht } from '../../responsive/responsive'

const SignUp = () => {
    return (
        <CustomSafeAreaView>
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={styles['header']}
                transition={{
                    duration: 1000
                }}
            >
                <CustomText
                    text={'회원가입'}
                    size={font(20)}
                    type={'Bold'}
                />
            </MotiView>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: ht(250),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SignUp