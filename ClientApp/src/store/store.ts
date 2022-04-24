import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./user/user.api";
import { activeUserReducer } from "./user/activeUser.slice";

export const store = configureStore({
    reducer: { 
        [userApi.reducerPath]: userApi.reducer,
        activeUser: activeUserReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
})

export type TypeRootState = ReturnType<typeof store.getState>