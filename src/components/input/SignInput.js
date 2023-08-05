import { MotiView } from 'moti'
import React from 'react'
import { TextInput } from 'react-native'
import CustomText from '../CustomText'

const SignInput = ({
    label,
    placeholder = '',
    value = '',
    setValue,
    textColor,
    type
}) => {
    return (
        <MotiView>
            <CustomText
                text={label}
                color={textColor && textColor}
            />
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={text => setValue(text)}
            />
        </MotiView>
    )
}

export default SignInput