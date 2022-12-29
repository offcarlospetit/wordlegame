import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from '@supabase/supabase-js';
import { AuthSessionResult } from 'expo-auth-session';

export type UserState = Partial<AuthSessionResult> & Partial<UserResponse['data']> & {};

const initialState: UserState = {};

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
        logOut: (state) => initialState
    },
});

// Action creators are generated for each case reducer function
export const { setInitialUser, loginSuccess, logOut } = userSlice.actions;

export default userSlice;