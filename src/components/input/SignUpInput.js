import { MotiView } from 'moti'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { font, ht, wt } from '../../../responsive/responsive'
import { COLORS } from '../../asset/colors'
import { styled } from 'styled-components'
import CustomText from '../CustomText'
import { MotiPressable } from 'moti/interactions'

const SignUpInput = ({
    value,
    setValue,
    placeholder,
    label
}) => {

    const [focused, setFocused] = useState(false);

    return (
        <MotiView
            style={{
                width: "100%",
                height: '100%',
                justifyContent: "center",
                overflow: "hidden",
                borderBottomWidth: 2,
                borderColor: value.length > 0 ? COLORS.success : COLORS.border
            }}
        >
            <TextInput
                style={{
                    paddingHorizontal: wt(80),
                    color: COLORS.text,
                    fontSize: font(16),
                    textAlign: "center",
                    fontFamily: "Pretendard-Medium"
                }}
                value={value}
                onChangeText={text => setValue(text)}
                autoFocus={true}
            />
        </MotiView>
    )
}


export default SignUpInput