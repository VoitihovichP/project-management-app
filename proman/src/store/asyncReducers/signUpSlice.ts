import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  id: string;
  login: string;
  name: string;
  error: string;
};

type Response = {
  id: string;
  login: string;
  name: string;
};

const initialState: InitialState = {
  isLoading: false,
  id: '',
  login: '',
  name: '',
  error: '',
};

export const signUp = createAsyncThunk(
  'signUp',
  async (data: { name: string; login: string; password: string }, thunkAPI) => {
    const { name, login, password } = data;
    try {
      const response = await axios.post(Requests.SIGN_UP, {
        name: name,
        login: login,
        password: password,
      });
      console.log(response.data);
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue('Error');
    }
  }
);

export const signUpSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: {
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.name = action.payload.name;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default signUpSlice.reducer;
