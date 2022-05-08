import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import Button from '@mui/material/Button';

const Welcome: FC = () => {
  const { isLogin } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { userLogin } = userSlice.actions;

  return (
    <div>
      <Button variant="contained" onClick={() => dispatch(userLogin(!isLogin))}>
        Click
      </Button>
      <h1>{isLogin ? 'Hello Page' : 'Welcome Page'}</h1>
    </div>
  );
};

export default Welcome;
