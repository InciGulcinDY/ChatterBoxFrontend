import { configureStore } from '@reduxjs/toolkit';
import messagesReducer, { setMessages } from './messagesSlice';
import friendReducer, { setFriend } from './friendSlice';
import userReducer from './userSlice';
import roomReducer from './roomSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    messages: messagesReducer,
    friend: friendReducer,
    room: roomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
