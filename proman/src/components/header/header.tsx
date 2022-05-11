import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './header.scss';

import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 43,
  height: 22,
  padding: 7.3,
  display: 'flex',
  alignItems: 'center',
  '& .MuiSwitch-switchBase': {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5%',
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(17px)',
      '& .MuiSwitch-thumb:before': {
        content: "''",
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffffff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#1976d2',
    width: 20,
    height: 18,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#ffffff',
    borderRadius: 20 / 2,
  },
}));

const Header: FC = () => {
  return (
    <header>
      <div className="header_left-block">
        <h1>Pro-Man</h1>
        <Stack className="language-switch" direction="row" spacing={1} alignItems="center">
          <Typography className="language-switch_left-text">RU</Typography>
          <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} />} label="" />
          <Typography className="language-switch_right-text">EN</Typography>
        </Stack>
      </div>
      <div className="header_right-block">
        <Button className="login-button" variant="contained">
          Вход
        </Button>
        <Button variant="contained">Регистрация</Button>
      </div>
    </header>
  );
};

export default Header;
