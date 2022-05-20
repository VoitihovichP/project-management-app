import { combineReducers, configureStore } from '@reduxjs/toolkit';
import signInSlice from './asyncReducers/signInSlice';
import signUpSlice from './asyncReducers/signUpSlice';
import boardReducer from './asyncReducers/boardSlice';
import formSlice from './reducers/formSlice';
import userReducer from './reducers/userSlice';
import boardIdReducer from './reducers/boardIdSlice';
import columnSlice from './asyncReducers/columnsSlice';

const rootReducer = combineReducers({
  columnSlice,
  boardIdReducer,
  boardReducer,
  userReducer,
  signUpSlice,
  signInSlice,
  formSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
