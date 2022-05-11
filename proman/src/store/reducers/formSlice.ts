import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  isShowSignUp: boolean;
};

const initialState: InitialState = {
  isShowSignUp: true,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    showSignUpForm(state, action: PayloadAction<boolean>) {
      state.isShowSignUp = action.payload;
    },
  },
});

export default formSlice.reducer;
