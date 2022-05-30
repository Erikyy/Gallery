import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: string | null;
}

const initialState: ThemeState = {
  theme:
    localStorage.getItem('theme') !== null
      ? localStorage.getItem('theme')
      : 'light'
};

export const themeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    }
  }
});

export const { setMode } = themeSlice.actions;
export const ThemeReducer = themeSlice.reducer;
