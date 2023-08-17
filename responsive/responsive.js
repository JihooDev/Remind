import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { Dimensions, PixelRatio } from 'react-native';

const ZEPLIN_WINDOW_WIDTH = 1440;
const ZEPLIN_WINDOW_HEIGHT = 3200;
const currentPixel = PixelRatio.get();
const { width, height } = Dimensions.get('window');
const w = width;
const h = height;

export const wt = (width) => {
    const percentage = (width / ZEPLIN_WINDOW_WIDTH) * 100;
    return responsiveWidth(percentage);

}

export const ht = (height) => {
    return Dimensions.get('screen').width / ZEPLIN_WINDOW_WIDTH * height;
}

export const top = (top) => {
    return top / currentPixel * currentPixel * (h / ZEPLIN_WINDOW_HEIGHT) - getStatusBarHeight();
}

export const font = (size) => {
    const percentage = size * 0.125;
    return responsiveFontSize(percentage);
}