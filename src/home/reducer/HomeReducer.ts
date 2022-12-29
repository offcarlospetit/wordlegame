import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../../home/types';

export interface GameState extends Game {
}

const initialState: GameState = {
    wordOfTheDay: '',
    wordOfTheDayUseDate: '',
    wordOfTheDayLanguage: 'es',
    retry: 0,
    score: 0,
    time: 0,
};



export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action: PayloadAction<GameState>) => {
            return initialState;
        },
        endGame: (state, action: PayloadAction<Game>) => {
            return action.payload;
        },
        updateGame: (state, action: PayloadAction<Game>) => {
            return action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { startGame, endGame, updateGame } = gameSlice.actions;

export default gameSlice;