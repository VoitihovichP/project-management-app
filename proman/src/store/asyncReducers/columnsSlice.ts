import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  columns: Array<
    | {
        id: string;
        title: string;
        order: number;
      }
    | never
  >;
  error: string;
};

type ResponseColumn = {
  id: string;
  title: string;
  order: number;
};

const initialState: InitialState = {
  isLoading: false,
  columns: [],
  error: '',
};

export const getAllColumns = createAsyncThunk(
  'allColumns',
  async (data: { token: string; boardId: string }, { rejectWithValue }) => {
    const { token, boardId } = data;
    try {
      const response = await axios.get(`${Requests.ALL_BOARDS}/${boardId}/columns`, {
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

export const createColumn = createAsyncThunk(
  'createColumn',
  async (
    data: { nameColumn: string; order: number; token: string; boardId: string },
    { rejectWithValue }
  ) => {
    const { nameColumn, order, token, boardId } = data;
    try {
      const response = await axios.post(
        `${Requests.ALL_BOARDS}/${boardId}/columns`,
        {
          title: nameColumn,
          order: order,
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

export const deleteColumn = createAsyncThunk(
  'deleteColumn',
  async (data: { token: string; boardId: string; columnId: string }, { rejectWithValue }) => {
    const { token, boardId, columnId } = data;
    try {
      const response = await axios.delete(`${Requests.ALL_BOARDS}/${boardId}/columns/${columnId}`, {
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

export const changeColumn = createAsyncThunk(
  'changeColumn',
  async (
    data: { token: string; boardId: string; columnId: string; order: number; nameColumn: string },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, order, nameColumn } = data;
    try {
      const response = await axios.put(
        `${Requests.ALL_BOARDS}/${boardId}/columns/${columnId}`,
        {
          title: nameColumn,
          order: order,
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

export const columnSlice = createSlice({
  name: 'AllColumns',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllColumns.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllColumns.fulfilled.type]: (state, action: PayloadAction<ResponseColumn[]>) => {
      state.isLoading = false;
      state.columns = action.payload;
    },
    [getAllColumns.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [createColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createColumn.fulfilled.type]: (state, action: PayloadAction<ResponseColumn>) => {
      state.isLoading = false;
      state.columns = [...state.columns, action.payload];
    },
    [createColumn.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteColumn.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [changeColumn.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeColumn.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [changeColumn.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default columnSlice.reducer;
