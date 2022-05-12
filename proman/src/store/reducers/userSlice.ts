import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isLogin: boolean;
};

const initialState: InitialState = {
  isLogin: false,
};

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
