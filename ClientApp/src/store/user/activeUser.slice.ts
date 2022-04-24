import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from './user.types'

export interface IActiveUser {
    user: IUser;
}

const initialState:IActiveUser = {} as IActiveUser

export const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        setUser: (state, action:PayloadAction<IUser>) => {
            state.user = action.payload 
        }
    }
})

export const activeUserReducer = activeUserSlice.reducer
export const activeUserActions = activeUserSlice.actions