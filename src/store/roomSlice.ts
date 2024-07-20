import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";

type RoomState = {
    room: string;
};

const initialState : RoomState = {
    room: '',
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<string>) {
            state.room = action.payload;
        },
        setRecipient(state, action: PayloadAction<UserModel>) {
            
        }
    }
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;