import { Button, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn } from '../../store/asyncReducers/signInSlice';
import { signUp, signUpSlice } from '../../store/asyncReducers/signUpSlice';
import { userSlice } from '../../store/reducers/userSlice';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../InputForm/InputForm';
import { PopUp } from '../modal/modal';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@mui/material/ToggleButton';
import { NavLink } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.signUpSlice);
  const { userLogin } = userSlice.actions;
  const [cookies, setCookie] = useCookies(['name', 'login', 'password', 'token']);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<RegistrationFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name, login, password }) => {
    dispatch(signUpSlice.actions.clear());
    const result = await dispatch(signUp({ name, login, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      const result = await dispatch(signIn({ login, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        setCookie('login', login, { path: '/', maxAge: 86400 });
        setCookie('password', password, { path: '/', maxAge: 86400 });
        setCookie('token', result.payload.token, { path: '/', maxAge: 86400 });
        dispatch(userLogin(true));
      }
    }
    reset();
  });

  const handleClose = () => dispatch(signUpSlice.actions.closeModal());

  return (
    <main style={{ display: 'grid' }}>
      <ThemeProvider theme={theme}>
        <NavLink to="/" style={{ justifySelf: 'right' }}>
          <ToggleButton
            value="close"
            sx={{
              borderColor: '#A2A0A2',
            }}
          >
            <CloseIcon style={{ color: '#A2A0A2' }} />
          </ToggleButton>
        </NavLink>
        <form className="authorization-form" onSubmit={onSubmit}>
          <legend className="authorization-legend">Регистрация</legend>
          <InputForm
            control={control}
            name="name"
            label="Имя"
            errorMessage="Длинна имени должна быть от 3 до 12 символов"
            maxLength={12}
            minLength={3}
          />
          <InputForm
            control={control}
            name="login"
            label="Логин"
            errorMessage="Длинна имени должна быть от 4 до 12 символов"
            maxLength={12}
            minLength={4}
          />
          <InputForm
            control={control}
            name="password"
            label="Пароль"
            errorMessage="Длинна имени должна быть от 4 до 8 символов"
            maxLength={8}
            minLength={4}
          />
          <div>
            <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
              Зарегестрироваться
            </Button>
          </div>
        </form>
      </ThemeProvider>
      <PopUp
        open={modal.isOpen}
        handleClose={handleClose}
        title={modal.title}
        message={modal.message}
      />
    </main>
  );
};
