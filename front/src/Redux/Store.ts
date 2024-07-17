import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AdminReducer } from "./AdminReducer";
import { AuthReducer } from "./AuthReducer";

const reducers = combineReducers({
    admin: AdminReducer,
    auth: AuthReducer,
});

export const Store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false, }),
});
