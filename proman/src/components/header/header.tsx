import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AntSwitch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import './header.scss';

const Header: FC = () => {
  const { isLogin } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { userLogin } = userSlice.actions;

  return (
    <header>
      <h1>Pro-Man</h1>
      <Stack className="language-switch" direction="row" spacing={1} alignItems="center">
        <Typography className="language-switch_left-text">Рус</Typography>
        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
        <Typography className="language-switch_right-text">Eng</Typography>
      </Stack>
      <Button
        className="login-button"
        variant="contained"
        onClick={() => dispatch(userLogin(!isLogin))}
      >
        Перейти к проектам
      </Button>
      <Button variant="contained" onClick={() => dispatch(userLogin(!isLogin))}>
        Зарегистрироваться
      </Button>
    </header>
  );
};

export default Header;
