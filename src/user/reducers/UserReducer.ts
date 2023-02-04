import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserResponse, User, Session } from '@supabase/supabase-js';
import { AuthSessionResult } from 'expo-auth-session';


export interface UserState {
    user: User | null;
    session: Session | null;
    rank?: number;
    points?: number;
};

const initialState: UserState = {
    user: null,
    session: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setInitialUser: (state) => {
            state = initialState;
        },
        loginSuccess: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        logOut: (state) => initialState,
        updateUserRank: (state, action: PayloadAction<{ rank: number, points: number; }>) => {
            state.rank = action.payload.rank;
            state.points = action.payload.points;
            return state;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setInitialUser, loginSuccess, logOut, updateUserRank } = userSlice.actions;

export default userSlice;