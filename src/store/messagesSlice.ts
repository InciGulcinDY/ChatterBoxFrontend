import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageModel } from '../models/MessageModel';

type MessagesState = {
  messages: MessageModel[];
};

const initialState: MessagesState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<MessageModel[]>) {
      state.messages = action.payload;
    },
    markMessageAsRead(state, action: PayloadAction<number>) {
      const messageId = action.payload;
      const message = state.messages.find(m => m.id === messageId);
      if (message) {
        message.read = true;
      }
    },
  },
});

export const { setMessages, markMessageAsRead } = messagesSlice.actions;

export default messagesSlice.reducer;
