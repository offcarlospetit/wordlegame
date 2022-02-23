import { Dimensions } from "react-native";
import { Exist } from "../types";
const { width, height } = Dimensions.get('window');
export const SIZE = 55;
export const SIZE_QWERTY = width / 10;

export const _qwerty = [
    [
        { letter: 'q', color: 'white', textColor: 'black' },
        { letter: 'w', color: 'white', textColor: 'black' },
        { letter: 'e', color: 'white', textColor: 'black' },
        { letter: 'r', color: 'white', textColor: 'black' },
        { letter: 't', color: 'white', textColor: 'black' },
        { letter: 'y', color: 'white', textColor: 'black' },
        { letter: 'u', color: 'white', textColor: 'black' },
        { letter: 'i', color: 'white', textColor: 'black' },
        { letter: 'o', color: 'white', textColor: 'black' },
        { letter: 'p', color: 'white', textColor: 'black' },
    ],
    [
        { letter: 'a', color: 'white', textColor: 'black' },
        { letter: 's', color: 'white', textColor: 'black' },
        { letter: 'd', color: 'white', textColor: 'black' },
        { letter: 'f', color: 'white', textColor: 'black' },
        { letter: 'g', color: 'white', textColor: 'black' },
        { letter: 'h', color: 'white', textColor: 'black' },
        { letter: 'j', color: 'white', textColor: 'black' },
        { letter: 'k', color: 'white', textColor: 'black' },
        { letter: 'l', color: 'white', textColor: 'black' },
        { letter: 'ñ', color: 'white', textColor: 'black' },
    ],
    [
        { letter: '0', color: 'white', textColor: 'black' },
        { letter: 'z', color: 'white', textColor: 'black' },
        { letter: 'x', color: 'white', textColor: 'black' },
        { letter: 'c', color: 'white', textColor: 'black' },
        { letter: 'v', color: 'white', textColor: 'black' },
        { letter: 'b', color: 'white', textColor: 'black' },
        { letter: 'n', color: 'white', textColor: 'black' },
        { letter: 'm', color: 'white', textColor: 'black' },
        { letter: '1', color: 'white', textColor: 'black' },
    ],
];

export const existTypeColor: Record<Exist, string> = {
    0: '#ffbdbd',
    1: '#4CAF50',
    2: '#FFEB3B',
};

export const existTypeColorText: Record<Exist, string> = {
    0: 'white',
    1: 'black',
    2: 'black',
};
