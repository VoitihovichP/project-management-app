import { combineReducers, configureStore } from '@reduxjs/toolkit';
import signInSlice from './asyncReducers/signInSlice';
import signUpSlice from './asyncReducers/signUpSlice';
import mainPageSlice from './asyncReducers/mainPageSlice';
import formSlice from './reducers/formSlice';
import userReducer from './reducers/userSlice';
import boardIdReducer from './reducers/boardIdSlice';
import boardSlice from './asyncReducers/boardSlice';

const rootReducer = combineReducers({
  boardSlice,
  boardIdReducer,
  mainPageSlice,
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
