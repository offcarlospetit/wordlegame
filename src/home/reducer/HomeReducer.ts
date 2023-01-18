import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../../home/types';

export interface GameState extends Game {
}

const initialState: GameState = {
    wordOfTheDay: undefined,
    wordOfTheDayUseDate: '',
    wordOfTheDayLanguage: 'es',
    retry: 0,
    score: 0,
    time: 0,
    grid: [],
    actualRow: 0,
    actualColumn: 0,
    evaluatingRow: false,
    isSolved: false,
    attempts: 0,
    totalPoints: 0,
    letters: [],
    qwerty: [],
    dateStart: undefined,
    dateEnd: undefined,
};



export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<GameState>) => {
            return {
                ...initialState,
            };
        },
        endGame: (state, action: PayloadAction<Game>) => {
            return {
                ...action.payload,
                dateEnd: new Date(),
            };
        },
        updateGame: (state, action: PayloadAction<Game>) => {
            return action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { startGame, endGame, updateGame } = gameSlice.actions;

export default gameSlice;