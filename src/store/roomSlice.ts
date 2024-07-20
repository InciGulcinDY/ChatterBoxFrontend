import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomModel } from "../models/RoomModel";

type RoomState = {
    room: RoomModel;
};

const initialState : RoomState = {
    room: {
        room: "",
        userId:0,
        username:"",
        image:"",
        status:"",    
        unreadMessagesNumber: 0 
    }
}

const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom(state, action: PayloadAction<string>) {
            state.room.room = action.payload;
        },
        setSelectedRoom(state, action: PayloadAction<RoomModel>) {
            state.room = action.payload;
        }
    }
});

export const { setRoom, setSelectedRoom } = roomSlice.actions;

export default roomSlice.reducer;