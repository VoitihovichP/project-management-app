import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ModalText, Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  token: string;
  error: string;
  modal: {
    isOpen: boolean;
    title: string;
    message: string;
  };
};

type Response = {
  token: string;
};

const initialState: InitialState = {
  isLoading: false,
  token: '',
  error: '',
  modal: {
    isOpen: false,
    title: '',
    message: '',
  },
};

export const signIn = createAsyncThunk(
  'signIn',
  async (data: { login: string; password: string }, { rejectWithValue }) => {
    const { login, password } = data;
    try {
      const response = await axios.post(Requests.SIGN_IN, {
        login: login,
        password: password,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.title = '';
      state.modal.message = '';
    },
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
      state.modal.title = ModalText.SUCCESS_TITLE;
      state.modal.message = ModalText.SUCCESSFUL_LOGIN_MESSAGE;
      state.modal.isOpen = true;
    },
    [signIn.rejected.type]: (state) => {
      state.isLoading = false;
      state.modal.title = ModalText.ERROR_TITLE;
      state.modal.message = ModalText.ERROR_MESSAGE;
      state.modal.isOpen = true;
    },
  },
});

export default signInSlice.reducer;
