import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';

export interface UserState {
  user?: User;
}

const initialState: UserState = {
  user: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export const UserReducer = userSlice.reducer;
