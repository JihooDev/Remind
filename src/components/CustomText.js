import React from 'react';
import { Text } from 'react-native';
import { font } from '../../responsive/responsive';
import { COLORS } from '../asset/colors';


/**
 * @function CustomText
 * @param {string} text = 화면에 띄울 문자열
 * @param {number} size = 폰트 사이즈 (default : 15)
 * @param {string} color = 폰트 색상 (default : #000)
 * @param {string} type = Black | Bold | Light | Medium | Regular | Thin
 * @returns {React.ReactElement}
 */
const CustomText = ({ text, size = 15, color = COLORS.text, type = "Medium", style }) => {
    return (
        <Text style={{ color, fontSize: font(size), fontFamily: `Pretendard-${type}`, ...style }}>
            {text}
        </Text>
    )
}


export default CustomText