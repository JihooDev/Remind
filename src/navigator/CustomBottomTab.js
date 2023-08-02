import React, { useEffect } from 'react'
import { styled } from 'styled-components'
import { ht, wt } from '../../responsive/responsive'
import { COLORS } from '../asset/colors'
import { Image, TouchableOpacity } from 'react-native'
import { ICON } from '../asset/asset'

const CustomBottomTab = ({ state, navigation, descriptors }) => {

    useEffect(() => {
        console.log(state);
    }, [])

    const getIcon = label => {
        switch (label) {
            case "Main":
                return ICON.home
            case "Note":
                return ICON.note
            case "Social":
                return ICON.social
            case "Setting":
                return ICON.setting
        }
    }

    return (
        <BottomBox
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 9,
                },
                shadowOpacity: 0.50,
                shadowRadius: 12.35,

                elevation: 19,
            }}
        >
            {
                state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({ name: route.name, merge: true });
                        }

                    }

                    if (label === 'AddNote') {
                        return (
                            <AddNoteBox
                                key={index}
                                activeOpacity={.9}
                                onPress={onPress}
                            >
                                <Image
                                    source={ICON.plus}
                                    style={{
                                        tintColor: "#fff",
                                        width: wt(100),
                                        height: ht(100)
                                    }}
                                />
                            </AddNoteBox>
                        )
                    } else {
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={.9}
                                onPress={onPress}
                            >
                                <Image
                                    source={getIcon(label)}
                                    style={{
                                        width: wt(100),
                                        height: ht(100),
                                        tintColor: isFocused ? '#FE9870' : null
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </BottomBox>
    )
}

const BottomBox = styled.View`
    width: 100%;
    height: ${ht(400)}px;
    background-color: #fff;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${wt(70)}px;
`

const AddNoteBox = styled.TouchableOpacity`
    width: ${wt(200)}px;
    height: ${ht(200)}px;
    background-color: ${COLORS.success};
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`

export default CustomBottomTab