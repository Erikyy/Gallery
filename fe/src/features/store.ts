import { configureStore } from '@reduxjs/toolkit';
import { ThemeReducer } from './theme/ThemeSlice';
import { UserReducer } from './user/UserSlice';

export const store = configureStore({
  reducer: {
    user: UserReducer,
    theme: ThemeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export const AppDispatch = typeof store.dispatch;
