import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from '../types/User';
import Api from '../api/Api';
import { SignUpFormInput } from '../pages/Profile';
import { changeLanguage } from 'i18next';
import { setError } from './error.slice';



interface UserState {
    user: User | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            console.log("🚀 ~ file: user.slice.ts:35 ~ action.payload:", action.payload)
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;


export const setAuthUser = (user: User): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            console.log("🚀 ~ file: user.slice.ts:48 ~ setAuthUser ~ user:", user)
            dispatch(setUser(user))
        } catch (err) {
            console.error("🚀 ~ file: user.slice.ts:55 ~ err:", err)
            dispatch(setError({ errorMessage: "Fail to set user" }))

        }
    }
}


export const getLoggedUser = (userId: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            console.log("🚀 ~ file: user.slice.ts:50 ~ getLoggedUser ~ userId:", userId)

            const response = await Api.get("/api/user", {
                params: { id: userId },
            });
            if (response.status === 200) {
                changeLanguage(response.data.language)
                dispatch(setUser(response.data));
            } else {
                dispatch(setError({ errorMessage: "Fail to get user" }))
            }
        }
        catch (err) {
            console.error("🚀 ~ file: user.slice.ts:61 ~ getLoggedUser ~ err:", err)
            dispatch(setError({ errorMessage: "Fail to get user" }))
        }
    }
};

export const updateUser = (data: SignUpFormInput, id: string | undefined): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            const response = await Api.put("/api/user",
                { ...data, updatedAt: new Date().toISOString() },
                { params: { id: id } }
            );
            if (response.status === 200) {
                changeLanguage(response.data.language)
                dispatch(setUser(response.data));
            } else {
                dispatch(setError({ errorMessage: "Fail to update user" }))
            }
        }
        catch (err) {
            console.error("🚀 ~ file: user.slice.ts:61 ~ getLoggedUser ~ err:", err)
            dispatch(setError({ errorMessage: "Fail to update user" }))

        }
    }
};