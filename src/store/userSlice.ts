import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel"
import { stat } from "fs";

type UserState = {
    user: UserModel;
    isLogin: boolean;
};

const initialState: UserState = {
    user: {
        id: 0,
        userName: "",
        email: "",
        firstname: "",
        lastname: "",
        image: "",
    },
    isLogin: false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<number>) {
            state.user.id = action.payload;
        },

        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload;
        }
    },
});

export const { setUserId, setIsLogin } = userSlice.actions;

export default userSlice.reducer;