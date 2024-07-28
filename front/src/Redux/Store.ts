import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AdminReducer } from "./AdminReducer";
import { AuthReducer } from "./AuthReducer";
import { PatientReducer } from "./PatientsReducer";

const reducers = combineReducers({
    admin: AdminReducer,
    auth: AuthReducer,
    patient: PatientReducer
});

export const Store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false, }),
});
