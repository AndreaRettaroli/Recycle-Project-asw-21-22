import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThunkAction } from "@reduxjs/toolkit";
import {  RootState } from "./store";
import { User } from '../types/User';



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


export const setAuthUser = (user: User): ThunkAction<void, RootState, unknown, any> => {
    return async dispatch => {
        try {
            console.log("🚀 ~ file: user.slice.ts:48 ~ setAuthUser ~ user:", user)
            dispatch(setUser(user))
        } catch (err) {
            console.error("🚀 ~ file: user.slice.ts:55 ~ err:", err)

        }
    }
}


// /**
//  *  Azione che ottiene i dati relativi ad un utente
//  */
// export const getUser = (): ThunkAction<void, RootState, unknown, any> => {
//     return async (dispatch: AppDispatch) => {
//         try {
//             const response = await API.get('/user');
//             dispatch(setUser(response.data));
//         } catch (err) {
//             throw new Error(err.message);
//         }
//     };
// };
