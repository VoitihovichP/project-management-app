import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Requests } from '../../types/enums';

type InitialState = {
  isLoading: boolean;
  tasks: Array<
    | {
        id: string;
        title: string;
        order: number;
        description: string;
        userId: string;
        boardId: string;
        columnId: string;
        files: [
          {
            filename: string;
            fileSize: number;
          }
        ];
      }
    | never
  >;
  error: string;
};

type ResponseTask = {
  id: string;
  title: string;
  order: number;
};

const initialState: InitialState = {
  isLoading: false,
  tasks: [],
  error: '',
};

export const getAllTasks = createAsyncThunk(
  'alltasks',
  async (data: { token: string; boardId: string }, { rejectWithValue }) => {
    const { token, boardId } = data;
    try {
      const response = await axios.get(`${Requests.ALL_BOARDS}/${boardId}/tasks`, {
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

export const createTask = createAsyncThunk(
  'createtask',
  async (
    data: {
      nameTask: string;
      token: string;
      boardId: string;
      columnId: string;
      description: string;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    const { nameTask, token, boardId, columnId, description, userId } = data;
    try {
      const response = await axios.post(
        `${Requests.ALL_BOARDS}/${boardId}/columns/${columnId}/tasks`,
        {
          title: nameTask,
          description: description,
          userId: userId,
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

export const deleteTask = createAsyncThunk(
  'deletetask',
  async (data: { token: string; boardId: string; taskId: string }, { rejectWithValue }) => {
    const { token, boardId, taskId } = data;
    try {
      const response = await axios.delete(`${Requests.ALL_BOARDS}/${boardId}/tasks/${taskId}`, {
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

export const changeTask = createAsyncThunk(
  'changetask',
  async (
    data: { token: string; boardId: string; taskId: string; order: number; nametask: string },
    { rejectWithValue }
  ) => {
    const { token, boardId, taskId, order, nametask } = data;
    try {
      const response = await axios.put(
        `${Requests.ALL_BOARDS}/${boardId}/tasks/${taskId}`,
        {
          title: nametask,
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

export const taskSlice = createSlice({
  name: 'Alltasks',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTasks.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllTasks.fulfilled.type]: (state, action: PayloadAction<ResponseTask[]>) => {
      state.isLoading = false;
    },
    [getAllTasks.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [createTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled.type]: (state, action: PayloadAction<ResponseTask>) => {
      state.isLoading = false;
    },
    [createTask.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [changeTask.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeTask.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [changeTask.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default taskSlice.reducer;
