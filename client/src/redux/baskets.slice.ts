import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from '../types/User';
import api from '../api/Api';

interface Basket {
    _id: string
    userId: string
    type: string
    dimension: number,
    filling: number,
    createdAt: Date,
    updatedAt: Date | null,
}


interface BasketsState {
    fetchedData: boolean,
    baskets: Basket[] | null;
}

const initialState: BasketsState = {
    fetchedData: false,
    baskets: null,
};

export const basketsSlice = createSlice({
    name: 'baskets',
    initialState,
    reducers: {
        setBaskets: (state, action: PayloadAction<Basket[]>) => {
            console.log("🚀 ~ file: baskets.store.ts:33 ~ action.payload:", action.payload)
            state.baskets = action.payload;
            state.fetchedData = true;
        },
        clearBaskets: (state) => {
            state.baskets = null;
            state.fetchedData = false;
        },
    },
});

export const { setBaskets, clearBaskets } = basketsSlice.actions;

export default basketsSlice.reducer;

export const getBaskets = (userId: string, token: string): ThunkAction<void, RootState, unknown, any> => {
    return async dispatch => {
        try {
            const response = await api.get("/api/baskets", {
                params: { userId: userId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("🚀 ~ file: baskets.store.ts:58 ~ getBaskets ~ response:", response)
            if (response.status === 200 && !response.data.error) {

                dispatch(setBaskets(response.data))
            }
        } catch (err) {
            console.error("🚀 ~ file: user.slice.ts:55 ~ err:", err)

        }
    }
}