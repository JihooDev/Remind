import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import CustomText from './CustomText'
import { Image } from 'react-native'

const SettingList = ({
    title,
    icon
}) => {
    return (
        <ListView
            activeOpacity={.9}
        >
            <PositionView>
                <Image
                    source={icon}
                    style={{
                        width: wt(80),
                        height: ht(80)
                    }}
                />
            </PositionView>
            <PositionView center={true}>
                <CustomText
                    text={title}
                    type={'Bold'}
                    size={16}
                />
            </PositionView>
            <PositionView></PositionView>
        </ListView>
    )
}

const ListView = styled.TouchableOpacity`
    width: 100%;
    height: ${ht(230)}px;
    margin-top: ${ht(80)}px;
    background-color: ${COLORS.white};
    border-radius: 5px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const PositionView = styled.View`
    width: ${props => props.center ? '60%' : '20%'};
    height: 100%;
    justify-content: center;
    align-items: center;
`

export default SettingList