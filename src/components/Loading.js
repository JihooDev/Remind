import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { styled } from 'styled-components'
import { LOTTIE } from '../asset/asset'
import { wt } from '../../responsive/responsive'

const Loading = () => {
    return (
        <LoadingView>
            <AnimatedLottieView
                source={LOTTIE.loading}
                autoPlay
                loop
                style={{
                    width: wt(1000)
                }}
            />
        </LoadingView>
    )
}

const LoadingView = styled.View`
    width: 100%;
    height: 120%;
    background-color: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    z-index: 999;
`

export default Loading