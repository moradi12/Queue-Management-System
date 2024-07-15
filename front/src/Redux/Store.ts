import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { subscribeReducer } from "./subscribeReducer";
import adminReducer from "./AdminReducer";

const reducers = combineReducers({ 
    auth: AuthReducer,
    subscribe: subscribeReducer, // Add your subscribe reducer
    admin:adminReducer
    
});

export const Store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

// Subscribe to store changes
Store.subscribe(() => {
    console.log('Store updated:', Store.getState());
});
