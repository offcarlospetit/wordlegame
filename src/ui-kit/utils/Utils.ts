import { Colors } from "..";
import { Exist } from "../types";

const wallpaper = require('../../assets/wallpaper.png');

export const COLOR_BY_TYPE: Record<Exist, string> = {
    0: Colors.semanticRedError,
    1: Colors.primaryGreen,
    2: Colors.primaryYellow,
};

export const TEXT_COLOR_BY_TYPE: Record<Exist, string> = {
    0: Colors.white,
    1: Colors.white,
    2: Colors.black,
};

export default { wallpaper };