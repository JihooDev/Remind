import React from 'react';
import { Text } from 'react-native';
import { font } from '../../responsive/responsive';


/**
 * @function CustomText
 * @param {string} text = 화면에 띄울 문자열
 * @param {number} size = 폰트 사이즈 (default : 15)
 * @param {string} color = 폰트 색상 (default : #000)
 * @param {string} type = Black | Bold | Light | Medium | Regular | Thin
 * @returns {React.ReactElement}
 */
const CustomText = ({ text, size = 15, color = "#000", type = "Medium" }) => {
    return (
        <Text style={{ color, fontSize: font(size), fontFamily: `NotoSansKR-${type}` }}>
            {text}
        </Text>
    )
}


export default CustomText