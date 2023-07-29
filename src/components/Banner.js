import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ht, wt } from '../../responsive/responsive'
import PieChart from 'react-native-pie-chart'
import { styled } from 'styled-components'
import CustomText from './CustomText'

const Banner = () => {
    return (
        <MotiView
            style={styles['banner']}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2000 }}
        >
            <ChatView>
                <CenterView>
                </CenterView>
                <PieChart widthAndHeight={250} series={[123, 33]} sliceColor={['#ff9100', '#000']} coverRadius={0.9} />
            </ChatView>
        </MotiView>
    )
}

const styles = StyleSheet.create({
    banner: {
        width: "100%",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderRadius: wt(20),
        elevation: 5,
    }
})

const ChatView = styled.View`
    width: 100%;
    height: ${ht(1200)}px;
    justify-content: center;
    align-items: center;
`

const CenterView = styled.View`
    position: absolute;
    left: 25%;
    top: 20%;
    width: ${wt(700)}px;
    height: ${ht(700)}px;
    justify-content: center;
    align-items: center;
`

export default Banner