import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Welcome: FC = () => {
  const { isLogin } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { userLogin } = userSlice.actions;

  return (
    <div>
      <Button variant="contained" onClick={() => dispatch(userLogin(!isLogin))}>
        Click
      </Button>
      <Link to="/authorization">
        <Button variant="contained">Authorization</Button>
      </Link>
      <h1>{isLogin ? 'Hello Page' : 'Welocme Page'}</h1>
    </div>
  );
};

export default Welcome;
