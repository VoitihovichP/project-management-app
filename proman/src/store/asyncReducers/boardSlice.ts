import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Requests } from '../../types/enums';

type Board = {
  id: string;
  title: string;
  description: string;
  columns: Array<Column>;
};

type Column = {
  id: string;
  title: string;
  order: number;
  tasks: Tasks;
};

type Tasks = Array<Task | never>;

type Task = {
  id: string;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: string;
  columnId?: string;
  files: [
    {
      filename: string;
      fileSize: number;
    }
  ];
};

type InitialState = {
  isLoading: boolean;
  board: Board;
  newTaskId: string;
  error: string;
};

type ColumnResponse = {
  id: string;
  title: string;
  order: number;
};

const initialState: InitialState = {
  isLoading: false,
  board: {
    id: '',
    title: '',
    description: '',
    columns: [],
  },
  newTaskId: '',
  error: '',
};

export const getAllData = createAsyncThunk(
  'allData',
  async (data: { token: string; boardId: string }, { rejectWithValue }) => {
    const { token, boardId } = data;
    try {
      const response = await axios.get(`${Requests.BOARDS}/${boardId}`, {
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
    const { nameColumn, token, boardId } = data;
    try {
      const response = await axios.post(
        `${Requests.BOARDS}/${boardId}/columns`,
        {
          title: nameColumn,
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
      await axios.delete(`${Requests.BOARDS}/${boardId}/columns/${columnId}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return columnId;
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
        `${Requests.BOARDS}/${boardId}/columns/${columnId}`,
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
      const response = await axios
        .post(
          `${Requests.BOARDS}/${boardId}/columns/${columnId}/tasks`,
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
        )
        .then(async (response) => {
          const task: Task = response.data;
          const res = await axios.get(
            `${Requests.BOARDS}/${boardId}/columns/${columnId}/tasks/${task.id}`,
            {
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return res;
        });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'deletetask',
  async (
    data: { token: string; boardId: string; columnId: string; taskId: string },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, taskId } = data;
    try {
      const response = await axios
        .delete(`${Requests.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async () => {
          const response = await axios.get(`${Requests.BOARDS}/${boardId}/columns/${columnId}`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          return response;
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
    data: {
      token: string;
      boardId: string;
      columnId: string;
      taskId: string;
      order: number;
      nameTask: string;
      description: string;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, taskId, order, nameTask, description, userId } = data;
    try {
      const response = await axios.put(
        `${Requests.BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          title: nameTask,
          order: order,
          description: description,
          userId: userId,
          boardId: boardId,
          columnId: columnId,
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

export const boardSlice = createSlice({
  name: 'AllColumns',
  initialState,
  reducers: {
    updateTicketsInColum(state, action: PayloadAction<{ columnIndex: number; newArr: Tasks }>) {
      state.board.columns[action.payload.columnIndex].tasks = action.payload.newArr;
    },
    updateTicket(
      state,
      action: PayloadAction<{
        sourceIndex: number;
        destIndex: number;
        sourceTasks: Tasks;
        destTasks: Tasks;
      }>
    ) {
      state.board.columns[action.payload.sourceIndex].tasks = action.payload.sourceTasks;
      state.board.columns[action.payload.destIndex].tasks = action.payload.destTasks;
    },
  },
  extraReducers: {
    [getAllData.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getAllData.fulfilled.type]: (state, action: PayloadAction<Board>) => {
      state.isLoading = false;
      const board = action.payload;
      board.columns.sort((a, b) => {
        return a.order - b.order;
      });
      board.columns.forEach((column) => {
        column.tasks.sort((a, b) => {
          return a.order - b.order;
        });
      });
      state.board = board;
    },
    [getAllData.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [createColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createColumn.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoading = false;
      state.board.columns.push({ ...action.payload, tasks: [] });
    },
    [createColumn.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteColumn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteColumn.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.board.columns = state.board.columns.filter((elem) => elem.id !== action.payload);
    },
    [deleteColumn.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [changeColumn.pending.type]: (state) => {
      state.isLoading = false;
    },
    [changeColumn.fulfilled.type]: (state, action: PayloadAction<ColumnResponse>) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.id
      );
      if (columnIndex > -1) {
        state.board.columns[columnIndex].title = action.payload.title;
        state.board.columns[columnIndex].order = action.payload.order;
      }
    },
    [changeColumn.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [createTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      state.isLoading = false;
      state.board.columns.forEach((column) => {
        column.id === action.payload.columnId ? column.tasks.push(action.payload) : null;
      });
    },
    [createTask.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [deleteTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled.type]: (state, action: PayloadAction<Column>) => {
      state.isLoading = false;
      state.board.columns.forEach((column, index) => {
        if (column.id === action.payload.id) {
          state.board.columns[index] = action.payload;
        }
      });
    },
    [deleteTask.rejected.type]: (state) => {
      state.isLoading = false;
    },
    [changeTask.pending.type]: (state) => {
      state.isLoading = true;
    },
    [changeTask.fulfilled.type]: (state, action: PayloadAction<Task>) => {
      state.isLoading = false;
      const columnIndex = state.board.columns.findIndex(
        (column) => column.id === action.payload.columnId
      );
      if (columnIndex > -1) {
        const taskIndex = state.board.columns[columnIndex].tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (taskIndex > -1) state.board.columns[columnIndex].tasks[taskIndex] = action.payload;
      }
    },
    [changeTask.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});

export default boardSlice.reducer;
