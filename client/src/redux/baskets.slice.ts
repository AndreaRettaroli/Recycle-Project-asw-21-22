import { Action, AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { User } from '../types/User';
import Api from '../api/Api';
import { AddBasket } from '../pages';
import { BasketDimensions, BasketTypes } from '../types/Basket';
import { ClearRequest, PutRequest } from '../types/Acquisition';


interface Basket {
    _id: string
    userId: string
    type: BasketTypes
    dimension: BasketDimensions,
    filling: number,
    createdAt: Date,
    updatedAt: Date | null,
}


interface BasketsState {
    fetchedData: boolean,
    baskets: Basket[] ;
}

const initialState: BasketsState = {
    fetchedData: false,
    baskets: [],
};

export const basketsSlice = createSlice({
    name: 'baskets',
    initialState,
    reducers: {
        setBaskets: (state, action: PayloadAction<Basket[]>) => {
            state.baskets = action.payload;
            state.fetchedData = true;
        },
        clearBaskets: (state) => {
            state.baskets = [];
            state.fetchedData = false;
        },
        addBasket: (state, action: PayloadAction<Basket>) => {
            state.baskets = [{ ...state.baskets, ...action.payload }]
            state.fetchedData = true
        },
        setUnfetched: (state) => {
            state.fetchedData = false
        },
        updateBaskets: (state, action: PayloadAction<Basket>) => {
            state.baskets?.splice(state.baskets.findIndex(basket => basket._id === action.payload._id), 1, action.payload)
            state.fetchedData = true
        },
        removeBasket: (state, action: PayloadAction<string | undefined>) => {
            state.baskets?.splice(state.baskets.findIndex(basket => basket._id === action.payload), 1)
            state.fetchedData = true
        },
        putTrash: (state, action: PayloadAction<PutRequest>) => {
            const index = state.baskets?.findIndex(basket => basket._id === action.payload.basketId)
            if (index !== null && index !== -1) {
                const basket = state.baskets[index]
                const newFilling = basket?.filling + action.payload.wasteWeight;
                if (basket && newFilling <= basket?.dimension) {
                    const newBasketStatus: Basket = {
                        ...basket,
                        filling: newFilling,
                    }
                    console.log("🚀 ~ file: baskets.slice.ts:70 ~ newBasketStatus:", newBasketStatus)
                    state.baskets?.splice(state.baskets.findIndex(basket => basket._id === action.payload.basketId), 1, { ...newBasketStatus })
                }
            }
        },
        clearTrash: (state, action: PayloadAction<ClearRequest>) => {
            const index = state.baskets?.findIndex(basket => basket._id === action.payload.basketId)
            if (index !== null && index !== -1) {
                const basket = state.baskets[index]
                const newBasketStatus: Basket = {
                    ...basket,
                    filling: 0,
                }
                console.log("🚀 ~ file: baskets.slice.ts:70 ~ newBasketStatus:", newBasketStatus)
                state.baskets?.splice(state.baskets.findIndex(basket => basket._id === action.payload.basketId), 1, { ...newBasketStatus })
            }
        }
    }
});

export const { setBaskets, clearBaskets, setUnfetched, addBasket, updateBaskets, removeBasket, putTrash, clearTrash } = basketsSlice.actions;

export default basketsSlice.reducer;

export const getBaskets = (userId: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            const response = await Api.get("/api/baskets", {
                params: { userId: userId },
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

export const createBasket = (data: any): ThunkAction<void, RootState, unknown, AnyAction> => {
    console.log("🚀 ~ file: baskets.slice.ts:76 ~ createBasket ~ data:", data)
    return async dispatch => {
        dispatch(setUnfetched())
        try {
            const response = await Api.post("/api/basket", {
                ...data
            })
            console.log("🚀 ~ file: baskets.slice.ts:80 ~ createBasket ~ response:", response)
            if (response.status === 200 && !response.data.error) {
                dispatch(addBasket(response.data))
            }
        } catch (err) {
            console.log("🚀 ~ file: baskets.slice.ts:94 ~ createBasket ~ err:", err)
        }
    }
}


export const updateBasket = (data: any): ThunkAction<void, RootState, unknown, AnyAction> => {
    console.log("🚀 ~ file: baskets.slice.ts:76 ~ createBasket ~ data:", data)
    return async dispatch => {
        dispatch(setUnfetched())
        try {
            const response = await Api.put("/api/basket", { ...data }, { params: { id: data._id } })
            console.log("🚀 ~ file: baskets.slice.ts:109 ~ updateBasket ~ response:", response)
            if (response.status === 200 && !response.data.error) {
                dispatch(updateBaskets(response.data))
            }
        } catch (err) {
            console.error("🚀 ~ file: baskets.slice.ts:114 ~ updateBasket ~ err:", err)
        }
    }
}

export const deleteBasket = (basketId: string | undefined): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        dispatch(setUnfetched())
        try {
            const response = await Api.delete("/api/basket", { params: { id: basketId } })
            console.log("🚀 ~ file: baskets.slice.ts:109 ~ deleteBasket ~ response:", response)
            if (response.status === 200 && !response.data.error) {
                if (!Object.is(basketId, undefined)) {
                    dispatch(removeBasket(basketId))
                }
            }
        } catch (err) {
            console.error("🚀 ~ file: baskets.slice.ts:129 ~ deleteBasket ~ err:", err)
        }
    }
}

export const onPutTrash = (data: any): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            console.log("🚀 ~ file: baskets.slice.ts:156 ~ putTrash ~ data:", data)
            dispatch(putTrash(data))
        } catch (err) {
            console.error("🚀 ~ file: baskets.slice.ts:129 ~ deleteBasket ~ err:", err)
        }
    }
}

export const onClearTrash = (data: any): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        try {
            console.log("🚀 ~ file: baskets.slice.ts:156 ~ putTrash ~ data:", data)
            dispatch(clearTrash(data))
        } catch (err) {
            console.error("🚀 ~ file: baskets.slice.ts:129 ~ deleteBasket ~ err:", err)
        }
    }
}
