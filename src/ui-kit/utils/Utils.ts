import { palette } from "../theme";
import { Exist } from "../types";

export const wallpaper = require('../../assets/wallpaper.png');

export const COLOR_BY_TYPE: Record<Exist, string> = {
    0: palette.FireOpal,
    1: palette.Emmerald,
    2: palette.MaximunYellowRoad
};

export const TEXT_COLOR_BY_TYPE: Record<Exist, string> = {
    0: palette.white,
    1: palette.white,
    2: palette.black,
};