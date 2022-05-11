import { combineReducers, configureStore } from '@reduxjs/toolkit';
import signInSlice from './asyncReducers/signInSlice';
import signUpSlice from './asyncReducers/signUpSlice';
import formSlice from './reducers/formSlice';

const rootReducer = combineReducers({
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
