import { configureStore } from '@reduxjs/toolkit';
import userReducer, { initializeStore } from './userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

store.dispatch(initializeStore());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
