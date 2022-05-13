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

export const getBoards = createAsyncThunk('Boards', async (data: { token: string }, thunkAPI) => {
  const { token } = data;
  try {
    const response = await axios.get(Requests.ALL_BOARDS, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    thunkAPI.rejectWithValue('Error');
  }
});

export const postBoards = createAsyncThunk(
  'CreateBoards',
  async (data: { title: string; token: string }, thunkAPI) => {
    const { title, token } = data;
    try {
      const response = await axios.post(
        Requests.ALL_BOARDS,
        { title: title },
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue('Error');
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
  },
});

export default getBoardsSlice.reducer;
