import { configureStore } from '@reduxjs/toolkit';
import userReducer, { initializeStore } from './userSlice';
import snackbarReducer from './snackbarSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    snackbar: snackbarReducer,
  },
});

store.dispatch(initializeStore());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
