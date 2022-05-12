import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  token: string;
  error: string;
};

type Response = {
  token: string;
};

const initialState: InitialState = {
  isLoading: false,
  token: '',
  error: '',
};

export const signIn = createAsyncThunk(
  'signIn',
  async (data: { login: string; password: string }, thunkAPI) => {
    const { login, password } = data;
    try {
      const response = await axios.post(Requests.SIGN_IN, {
        login: login,
        password: password,
      });
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue('Error');
    }
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    removeToken: (state) => {
      state.token = '';
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default signInSlice.reducer;
