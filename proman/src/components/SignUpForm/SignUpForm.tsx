import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn } from '../../store/asyncReducers/signInSlice';
import { signUp } from '../../store/asyncReducers/signUpSlice';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../InputForm/InputForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

export const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.signUpSlice);
  const { token } = useAppSelector((state) => state.signInSlice);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<RegistrationFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(({ name, login, password }) => {
    dispatch(signUp({ name, login, password }));
    token ? null : dispatch(signIn({ login, password }));
    // продумать логику входа, сейчас ошибка из за того что name уже есть в state и делается вход, возможно сделать проверку по токену
    reset();
  });

  return (
    <>
      <ThemeProvider theme={theme}>
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
        {error}
      </ThemeProvider>
    </>
  );
};
