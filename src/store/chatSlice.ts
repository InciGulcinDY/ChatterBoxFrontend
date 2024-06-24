import { createSlice } from "@reduxjs/toolkit";
import { MessageModel } from "../models/MessageModel";

export interface ChatState {
    chat: string;
}

const initialState: ChatState = {
  chat: ""
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {

    }

})

export const{ } = chatSlice.actions;
export default chatSlice.reducer;
