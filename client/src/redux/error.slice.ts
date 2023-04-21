import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
    isOnErrorState: boolean
    errorMessage: string
}

const initialState: ErrorState = {
    isOnErrorState: false,
    errorMessage: ""
};
interface Error {
    errorMessage: string
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<Error>) => {
            state.isOnErrorState = true
            state.errorMessage = action.payload.errorMessage;
        },
        clearError: (state) => {
            state = {...initialState}
        },
    },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;