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

type Response = Array<
  | {
      id: string;
      title: string;
    }
  | never
>;

const initialState: InitialState = {
  isLoading: false,
  boards: [],
  error: '',
};

export const getBoards = createAsyncThunk('Boards', async (data: { token: string }, thunkAPI) => {
  const { token } = data;
  try {
    const response = await axios.get(Requests.ALL_BOARDS, {
      headers: {
        'Content-type': 'appLication/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    thunkAPI.rejectWithValue('Error');
  }
});

export const getBoardsSlice = createSlice({
  name: 'AllBoards',
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getBoards.fulfilled.type]: (state, action: PayloadAction<Response>) => {
      state.isLoading = false;
      state.boards = action.payload;
    },
    [getBoards.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.boards = [];
      state.error = action.payload;
    },
  },
});

export default getBoardsSlice.reducer;
