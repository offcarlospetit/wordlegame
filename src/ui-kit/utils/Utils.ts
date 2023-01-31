import { palette } from "../theme";
import { Exist } from "../types";

export const wallpaper = require('../../assets/wallpaper.png');

export const Avatars: { item: NodeRequire, name: string; }[] = [
    { item: require('../../assets/bullbasaur.png'), name: 'bullbasaur' },
    { item: require('../../assets/charmander.png'), name: 'charmander' },
    { item: require('../../assets/ditto1.png'), name: 'ditto1' },
    { item: require('../../assets/ditto2.png'), name: 'ditto2' },
    { item: require('../../assets/dratini.png'), name: 'dratini' },
    { item: require('../../assets/eevee.png'), name: 'eevee' },
    { item: require('../../assets/jigglypuff.png'), name: 'jigglypuff' },
    { item: require('../../assets/meowth.png'), name: 'meowth' },
    { item: require('../../assets/mew2.png'), name: 'mew2' },
    { item: require('../../assets/pikachu.png'), name: 'pikachu' },
    { item: require('../../assets/pokemon-trainer.png'), name: 'pokemon-trainer' },
    { item: require('../../assets/psyduck.png'), name: 'psyduck' },
    { item: require('../../assets/snor1.png'), name: 'snor1' },
    { item: require('../../assets/snorlax.png'), name: 'snorlax' },
    { item: require('../../assets/squirtle.png'), name: 'squirtle' },
    { item: require('../../assets/zubat.png'), name: 'zubat' },
];

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