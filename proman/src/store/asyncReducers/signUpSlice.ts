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

export const signUp = createAsyncThunk(
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

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (data: { token: string; userId: string }, { rejectWithValue }) => {
    const { token, userId } = data;
    try {
      const response = await axios.delete(`${Requests.URL}/users/${userId}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  'updateUser',
  async (
    data: { name: string; login: string; password: string; token: string; userId: string },
    { rejectWithValue }
  ) => {
    const { name, login, password, token, userId } = data;
    try {
      const response = await axios.put(
        `${Requests.URL}/users/${userId}`,
        {
          name: name,
          login: login,
          password: password,
        },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signUpSlice = createSlice({
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
    [signUp.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.name = action.payload.name;
    },
    [signUp.rejected.type]: (state) => {
      state.isLoading = false;
      state.modal.title = ModalText.ERROR_TITLE;
      state.modal.message = ModalText.ERROR_MESSAGE;
      state.modal.isOpen = true;
    },
    [updateUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.name = action.payload.name;
      state.modal.title = ModalText.SUCCESS_TITLE;
      state.modal.message = ModalText.SUCCESSFUL_UPDATE_MESSAGE;
      state.modal.isOpen = true;
    },
    [updateUser.rejected.type]: (state) => {
      state.isLoading = false;
      state.modal.title = ModalText.ERROR_TITLE;
      state.modal.message = ModalText.ERROR_MESSAGE;
      state.modal.isOpen = true;
    },
    [deleteUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [deleteUser.rejected.type]: (state) => {
      state.isLoading = false;
      state.modal.title = ModalText.ERROR_TITLE;
      state.modal.message = ModalText.ERROR_MESSAGE;
      state.modal.isOpen = true;
    },
  },
});

export default signUpSlice.reducer;
