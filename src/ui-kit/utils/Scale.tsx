import { Dimensions, PixelRatio } from 'react-native';

export var { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('window');
// new Scale iPhone 11 Pro scale
// const wscale: number = SCREEN_WIDTH / 375;
// const hscale: number = SCREEN_HEIGHT / 812;
// based on iPhone 11 scale
const wscale: number = SCREEN_WIDTH / 414;
const hscale: number = SCREEN_HEIGHT / 896;
export const MIN_HEIGTH = 800;
export default function Scale(
    size: number,
    based: 'width' | 'height' = 'width',
) {
    const newSize = based === 'height' ? size * hscale : size * wscale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const { width } = Dimensions.get('window');
export const SIZE = Scale(55);
export const SIZE_QWERTY = Scale(width / 10);
