import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn } from '../../store/asincReducers/signInSlice';
import { signUp } from '../../store/asincReducers/signUpSlice';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../InputForm/InputForm';
import './authorizationForm.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

export const AuthorizationForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { name, error } = useAppSelector((state) => state.signUpSlice);
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
    name ? dispatch(signIn({ login, password })) : null;
    // продумать логику входа, сейчас ошибка из за того что name уже есть в state и делается вход, возможно сделать проверку по токену
    reset();
  });

  return (
    <ThemeProvider theme={theme}>
      <form className="authorization-form" onSubmit={onSubmit}>
        <InputForm
          control={control}
          name="name"
          label="Name"
          errorMessage="Enter a name from 3 to 12 characters long"
          maxLength={12}
          minLength={3}
        />
        <InputForm
          control={control}
          name="login"
          label="Login"
          errorMessage="Enter a name from 4 to 12 characters long"
          maxLength={12}
          minLength={4}
        />
        <InputForm
          control={control}
          name="password"
          label="Password"
          errorMessage="Enter a name from 4 to 8 characters long"
          maxLength={8}
          minLength={4}
        />
        <div>
          <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
            Signup
          </Button>
        </div>
      </form>
      {error}
    </ThemeProvider>
  );
};
