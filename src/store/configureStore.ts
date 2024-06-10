import { configureStore } from '@reduxjs/toolkit';
import messagesReducer, { setMessages } from './messagesSlice';
import friendReducer, { setFriend } from './friendSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    friend: friendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
