import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscribeState {
    status: boolean;
}

const initialState: SubscribeState = {
    status: false,
};

const subscribeSlice = createSlice({
    name: "subscribe",
    initialState,
    reducers: {
        subscribe: (state) => {
            state.status = true;
        },
        unsubscribe: (state) => {
            state.status = false;
        },
    },
});

export const { subscribe, unsubscribe } = subscribeSlice.actions;
export const subscribeReducer = subscribeSlice.reducer;
