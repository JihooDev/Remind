import React from 'react'
import { TouchableOpacity } from 'react-native'
import CustomText from './CustomText'
import { COLORS } from '../asset/colors'
import { ht } from '../../responsive/responsive'

const CustomButton = ({
    type = 'fill',
    title,
    onPress,
    fontSize = 17
}) => {
    if (type === 'outline') {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={{
                    width: "100%",
                    height: ht(220),
                    borderWidth: 1.5,
                    borderColor: COLORS.border,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CustomText
                    text={title}
                    size={fontSize}
                    color={COLORS.border}
                    type={'Bold'}
                />
            </TouchableOpacity>
        )
    } else if (type === 'fill') {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={{
                    width: "100%",
                    height: ht(220),
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.border
                }}
            >
                <CustomText
                    text={title}
                    size={fontSize}
                    color={'#fff'}
                    type={'Bold'}
                />
            </TouchableOpacity>
        )
    } else if (type === 'success') {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.8}
                style={{
                    width: "100%",
                    height: ht(220),
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.success
                }}
            >
                <CustomText
                    text={title}
                    size={fontSize}
                    color={'#fff'}
                    type={'Bold'}
                />
            </TouchableOpacity>
        )
    }
}

export default CustomButton