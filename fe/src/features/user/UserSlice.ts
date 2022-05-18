import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { UserProfile } from '../../models/UserProfile';

export interface UserState {
  user?: UserProfile;
}

const initialState: UserState = {
  user: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    }
  }
});

export const { setUser } = userSlice.actions;
export const UserReducer = userSlice.reducer;
