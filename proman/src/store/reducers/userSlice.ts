import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from '../initialState';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
  },
});

export default userSlice.reducer;
