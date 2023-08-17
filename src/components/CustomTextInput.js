import React from 'react'
import { TextInput } from 'react-native'
import { COLORS } from '../asset/colors'

const CustomTextInput = ({
    value = '',
    setValue,
    color
}) => {
    return (
        <TextInput
            value={value}
            onChangeText={text => setValue(text)}
            style={{
                color: color ?? COLORS.text,
                width: "100%",
                height: "100%"
            }}
        />
    )
}

export default CustomTextInput