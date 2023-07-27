import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ht } from '../../responsive/responsive'

const Banner = () => {
    return (
        <MotiView
            style={styles['banner']}
        >

        </MotiView>
    )
}

const styles = StyleSheet.create({
    banner: {
        width: "100%",
        height: ht(300),
        backgroundColor: "red"
    }
})

export default Banner