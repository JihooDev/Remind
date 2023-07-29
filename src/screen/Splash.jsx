import React from 'react'
import CustomSafeAreaView from '../components/CustomSafeAreaView'
import { styled } from 'styled-components'
import { font, ht } from '../../responsive/responsive'
import CustomCenterView from '../components/CustomCenterView'
import CustomText from '../components/CustomText'
import { MotiView } from 'moti'
import { Image } from 'react-native'
import { IMAGE } from '../asset/asset'

const Splash = () => {
    return (
        <CustomSafeAreaView>

            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: "100%", height: "20%", justifyContent: "center", alignItems: "center" }}
            >
                <CustomText
                    text={'당신의'}
                    type={'Bold'}
                    size={font(25)}
                />
                <CustomText
                    text={'생각을 보관하세요'}
                    type={'Bold'}
                    size={font(25)}
                />
            </MotiView>
            <BottomLoginView>

            </BottomLoginView>
            <TopView>
                <CustomCenterView>

                    <MotiView style={{ width: "100%", height: "100%", justifyContent: "flex-end", alignItems: "center" }}>
                        <Image
                            source={IMAGE.main}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </MotiView>
                </CustomCenterView>
            </TopView>
        </CustomSafeAreaView>
    )
}

const TopView = styled.View`
    flex: 1;
`

const BottomLoginView = styled.View`
    width: 100%;
    height: ${ht(800)}px;
`

export default Splash