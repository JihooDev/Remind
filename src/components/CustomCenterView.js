import React, { useEffect } from 'react'
import { View } from 'react-native'
import { ht, wt } from '../../responsive/responsive'

const CustomCenterView = ({
    children,
    width = '100%',
    height = '100%',
    backColor = '#fff'
}) => {
    return (
        <View
            style={{
                width: String(width).slice(-1) === '%' ? width : wt(Number(width)),
                height: String(height).slice(-1) === '%' ? height : ht(Number(height)),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: backColor
            }}
        >
            {children}
        </View>
    )
}

export default CustomCenterView