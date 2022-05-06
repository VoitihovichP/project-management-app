import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';

const Welcome: FC = () => {
  const { isLogin } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { userLogin } = userSlice.actions;

  return (
    <div>
      <button onClick={() => dispatch(userLogin(!isLogin))}>Click</button>
      <h1>{isLogin ? 'Hello Page' : 'Welocme Page'}</h1>
    </div>
  );
};

export default Welcome;
