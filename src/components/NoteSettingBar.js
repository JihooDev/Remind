import { MotiView } from 'moti'
import React from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import { ICON } from '../asset/asset'
import { Image } from 'react-native'

const NoteSettingBar = ({
    show,
    changeOption,
    bold,
    thin,
    colorList
}) => {

    const optionList = [
        {
            id: 1,
            image: ICON.bold,
            state: bold,
            name: 'bold'
        },
        {
            id: 2,
            image: ICON.medium,
            state: thin,
            name: "thin"
        },
        {
            id: 3,
            image: ICON.colorList,
            state: colorList,
            name: "color"
        },
    ]

    return (
        <MotiView
            style={{
                backgroundColor: COLORS.white,
                width: '100%',
                height: ht(250),
                zIndex: !show ? -1 : 0,
                position: !show ? 'absolute' : 'relative',
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}
            animate={{
                opacity: show ? 1 : 0,
                translateY: show ? 0 : -200,
                marginTop: show ? ht(120) : 0
            }}
        >
            {
                optionList.map(item => (
                    <ButtonView
                        key={item.id}
                        onPress={() => changeOption(item.name)}
                        style={{
                            backgroundColor: item.state ? COLORS.black : null
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{
                                width: "40%",
                                height: "40%",
                                tintColor: item.state ? COLORS.white : COLORS.black
                            }}
                        />
                    </ButtonView>
                ))
            }
        </MotiView>
    )
}

const ButtonView = styled.TouchableOpacity`
    width: ${wt(200)}px;
    border-radius: 50px;
    height: 70%;
    justify-content: center;
    align-items: center;
    margin: 0 ${wt(50)}px;
`


export default NoteSettingBar