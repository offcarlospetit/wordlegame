import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../../home/types';
import { gridBuilder } from '../utils/Builders';
import { Settings } from '../../utils/Settings';
import { _QWERTY_EN, _QWERTY_ES } from "../utils/Const";
const keyBoard = Settings.language == 'es' ? _QWERTY_ES : _QWERTY_EN;
export interface GameState extends Game {
}

const initialState: GameState = {
    wordOfTheDay: undefined,
    wordOfTheDayUseDate: '',
    wordOfTheDayLanguage: 'es',
    retry: 0,
    score: 0,
    time: 0,
    grid: gridBuilder(6),
    actualRow: 0,
    actualColumn: 0,
    evaluatingRow: false,
    isSolved: false,
    attempts: 0,
    totalPoints: 0,
    letters: [],
    qwerty: [...keyBoard],
    dateStart: undefined,
    dateEnd: undefined,
};



export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<GameState>) => {
            return {
                ...action.payload,
            };
        },
        endGame: (state, action: PayloadAction<Game>) => {
            return {
                ...action.payload,
            };
        },
        updateGame: (state, action: PayloadAction<Game>) => {
            return action.payload;
        },
        clearGame: (state) => {
            return initialState;
        }
    },
});

// Action creators are generated for each case reducer function
export const { startGame, endGame, updateGame, clearGame } = gameSlice.actions;

export default gameSlice;