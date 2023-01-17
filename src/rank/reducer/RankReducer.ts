import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Game } from '../../home/types';
import { Rank } from '../../core/types/RankTypes';

export interface RankState {
    rank: Rank[];
}

const initialState: RankState = {
    rank: [],
};

export const rankSlice = createSlice({
    name: 'rank',
    initialState,
    reducers: {
        setRank: (state, action: PayloadAction<RankState>) => {
            return action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setRank } = rankSlice.actions;

export default rankSlice;