import React, { FC } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';
import './profile.scss';

const Profile: FC = () => {
  const [cookies, , removeCookie] = useCookies(['login', 'password', 'token']);
  return (
    <main className="profile-page">
      <h2 className="profile-page_title">Редактировать профиль</h2>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-required"
            label="Введите новый логин"
            defaultValue={`${cookies.login}`}
          />
          <TextField
            id="outlined-required"
            label="Введите новый пароль"
            autoComplete="current-password"
            defaultValue={`${cookies.password}`}
          />
        </div>
        <div>
          <TextField
            id="filled-required"
            label="Введите новый логин"
            variant="filled"
            defaultValue={`${cookies.login}`}
          />
          <TextField
            id="filled-required"
            label="Введите новый пароль"
            autoComplete="current-password"
            variant="filled"
            defaultValue={`${cookies.password}`}
          />
        </div>
      </Box>
      <Button variant="contained">Сохранить изменения</Button>
      <Button variant="contained">Удалить аккаунт</Button>
    </main>
  );
};

export default Profile;
