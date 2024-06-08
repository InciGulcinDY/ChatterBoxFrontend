import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";

export interface FriendState {
    friend: UserModel | null;
    unreadMessageCount: number;
}

const initialState: FriendState = {
    friend: JSON.parse(localStorage.getItem("friend") || "null"),
    unreadMessageCount: 0
}

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriend(state, action: PayloadAction<UserModel>) {
            state.friend = action.payload;
            localStorage.setItem("friend", JSON.stringify(action.payload));
        },
        setUnreadMessageCount(state, action: PayloadAction<number>) {
            state.unreadMessageCount = action.payload;
        }
    }
});

export const { setFriend, setUnreadMessageCount } = friendSlice.actions;
export default friendSlice.reducer;
