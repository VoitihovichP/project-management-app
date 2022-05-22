import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  boards: Array<
    | {
        id: string;
        title: string;
      }
    | never
  >;
  error: string;
};

type GetResponse = Array<
  | {
      id: string;
      title: string;
    }
  | never
>;

type PostResponse = {
  id: string;
  title: string;
};

const initialState: InitialState = {
  isLoading: false,
  boards: [],
  error: '',
};

export const getBoards = createAsyncThunk(
  'Boards',
  async (data: { token: string }, { rejectWithValue }) => {
    const { token } = data;
    try {
      const response = await axios.get(Requests.ALL_BOARDS, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const postBoards = createAsyncThunk(
  'CreateBoards',
  async (data: { title: string; token: string }, { rejectWithValue }) => {
    const { title, token } = data;
    try {
      const response = await axios.post(
        Requests.ALL_BOARDS,
        { title: title, description: 'test' },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'deleteBoard',
  async (data: { id: string; token: string }, { rejectWithValue }) => {
    const { id, token } = data;
    try {
      const response = await axios.delete(`${Requests.ALL_BOARDS}/${id}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'updateBoard',
  async (data: { id: string; newTitle: string; token: string }, { rejectWithValue }) => {
    const { id, token, newTitle } = data;
    try {
      const response = await axios.put(
        `${Requests.ALL_BOARDS}/${id}`,
        { title: newTitle },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      rejectWithValue(e);
    }
  }
);

export const getBoardsSlice = createSlice({
  name: 'AllBoards',
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBoards.fulfilled.type]: (state, action: PayloadAction<GetResponse>) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.boards = [];
      state.error = action.payload;
    },
    [postBoards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [postBoards.fulfilled.type]: (state, action: PayloadAction<PostResponse>) => {
      state.isLoading = false;
      state.boards.push(action.payload);
    },
    [postBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteBoard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteBoard.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.boards = state.boards;
    },
    [deleteBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateBoard.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateBoard.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.boards = state.boards;
    },
    [updateBoard.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getBoardsSlice.reducer;
