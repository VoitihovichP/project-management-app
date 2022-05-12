import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn } from '../../store/asyncReducers/signInSlice';
import { userSlice } from '../../store/reducers/userSlice';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../InputForm/InputForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.signUpSlice);
  const { userLogin } = userSlice.actions;
  const [, setCookie] = useCookies(['login', 'password', 'token']);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<RegistrationFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ login, password }) => {
    const result = await dispatch(signIn({ login, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      setCookie('login', login, { path: '/', maxAge: 86400 });
      setCookie('password', password, { path: '/', maxAge: 86400 });
      setCookie('token', result.payload.token, { path: '/', maxAge: 86400 });
      dispatch(userLogin(true));
    }
    reset();
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <form className="authorization-form" onSubmit={onSubmit}>
          <legend className="authorization-legend">Вход</legend>
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
              Войти
            </Button>
          </div>
        </form>
        {error}
      </ThemeProvider>
    </>
  );
};
