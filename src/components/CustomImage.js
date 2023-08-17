import React from 'react'
import { Image } from 'react-native';

const CustomImage = (
    source,
    resize = 'contain',
    width,
    height
) => {
    return (
        <Image
            source={source}
            style={{
                width: width ?? '100%',
                height: height ?? '100%'
            }}
            resizeMode='contain'
        />
    )
}

export default CustomImage