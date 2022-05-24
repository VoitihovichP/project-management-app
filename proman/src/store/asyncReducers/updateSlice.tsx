import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ModalText, Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  id: string;
  login: string;
  name: string;
  modal: {
    isOpen: boolean;
    title: string;
    message: string;
  };
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
  modal: {
    isOpen: false,
    title: '',
    message: '',
  },
};

export const updateUser = createAsyncThunk(
  'signUp',
  async (data: { name: string; login: string; password: string }, { rejectWithValue }) => {
    const { name, login, password } = data;
    try {
      const response = await axios.post(Requests.SIGN_UP, {
        name: name,
        login: login,
        password: password,
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateUserSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.title = '';
      state.modal.message = '';
    },
    clear: (state) => {
      state.isLoading = false;
      state.id = '';
      state.login = '';
      state.name = '';
    },
  },
  extraReducers: {
    [updateUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.name = action.payload.name;
      state.modal.title = ModalText.SUCCESS_TITLE;
      state.modal.message = ModalText.SUCCESSFUL_REGISTRATION_MESSAGE;
      state.modal.isOpen = true;
    },
    [updateUser.rejected.type]: (state) => {
      state.isLoading = false;
      state.modal.title = ModalText.ERROR_TITLE;
      state.modal.message = ModalText.ERROR_MESSAGE;
      state.modal.isOpen = true;
    },
  },
});

export default updateUserSlice.reducer;
