import React, { FC } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';
import './profile.scss';

import { useForm } from 'react-hook-form';
// import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// import { signInSlice, signIn } from '../../store/asyncReducers/signInSlice';
// import { userSlice } from '../../store/reducers/userSlice';
// import { signUp, signUpSlice } from '../../store/asyncReducers/signUpSlice';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../../components/InputForm/InputForm';
// import { PopUp } from '../../components/modal/modal';
// import CloseIcon from '@material-ui/icons/Close';
// import ToggleButton from '@mui/material/ToggleButton';
// import { NavLink } from 'react-router-dom';

const Profile: FC = () => {
  // const dispatch = useAppDispatch();
  // const { modal } = useAppSelector((state) => state.signUpSlice);
  // const { userLogin } = userSlice.actions;
  const [cookies] = useCookies(['login', 'password', 'token']);
  const {
    // handleSubmit,
    control,
    // reset,
    formState: { isValid },
  } = useForm<RegistrationFormInputs>({
    mode: 'onChange',
  });

  return (
    <main className="profile-page">
      <h2 className="profile-page_title">Редактировать профиль</h2>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': {
            m: 1,
            width: '41ch',
            '@media (max-width: 400px)': {
              width: '32ch',
            },
          },
        }}
        autoComplete="off"
        // onSubmit={onSubmit}
      >
        <InputForm
          control={control}
          name="name"
          label="Введите Ваше новое имя"
          errorMessage="Длинна имени должна быть от 3 до 12 символов"
          maxLength={12}
          minLength={3}
          defaultValue={cookies.login}
        />
        <InputForm
          control={control}
          name="login"
          label="Введите Ваш новый логин"
          errorMessage="Длинна логина должна быть от 4 до 12 символов"
          maxLength={12}
          minLength={4}
          defaultValue={cookies.login}
        />
        <InputForm
          control={control}
          name="password"
          label="Введите Ваш новый пароль"
          errorMessage="Длинна пароля должна быть от 4 до 8 символов"
          maxLength={8}
          minLength={4}
          defaultValue={cookies.password}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
        Сохранить изменения
      </Button>
      <Button variant="contained">Удалить аккаунт</Button>
      {/*<PopUp
        open={modal.isOpen}
        handleClose={handleClose}
        title={modal.title}
        message={modal.message}
      />*/}
    </main>
  );
};

export default Profile;
