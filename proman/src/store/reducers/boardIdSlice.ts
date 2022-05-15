import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  deleteBoardId: string;
};

const initialState: InitialState = {
  deleteBoardId: '',
};

export const boardIdSlice = createSlice({
  name: 'BoardId',
  initialState,
  reducers: {
    changeBoardId(state, action: PayloadAction<string>) {
      state.deleteBoardId = action.payload;
    },
  },
});

export default boardIdSlice.reducer;
