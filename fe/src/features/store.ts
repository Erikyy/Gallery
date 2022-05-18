import { configureStore } from '@reduxjs/toolkit';
import { UserReducer } from './user/UserSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
