import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageModel } from '../models/MessageModel';
import MessageSendingCard from '../components/MessageSendingCard';
import { SentMessageModel } from '../models/SentMessageModel';

type MessagesState = {
  messages: MessageModel[];
  sentMessage: SentMessageModel | null;
};

const initialState: MessagesState = {
  messages: [],
  sentMessage: {
    //id: null,
    content: '',
    senderId: null,
    recipientId: null,
    //read: null,
    //createdDate: null,

  }
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
    setSentMessage(state, action: PayloadAction<SentMessageModel | null>) {
      state.sentMessage = action.payload;
    },
  },
});

export const { setMessages, markMessageAsRead, setSentMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
