import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signInSlice, signIn } from '../../store/asyncReducers/signInSlice';
import { userSlice } from '../../store/reducers/userSlice';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../InputForm/InputForm';
import { PopUp } from '../Modal/modal';
import CloseIcon from '@material-ui/icons/Close';
import ToggleButton from '@mui/material/ToggleButton';
import { NavLink } from 'react-router-dom';

import { injectIntl, FormattedMessage } from 'react-intl';
import { useEffect } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

export const SignInForm: React.FC = injectIntl(({ intl }) => {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.signInSlice);
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

  const closeModal = () => {
    if (modal.isOpen) {
      setTimeout(() => {
        dispatch(signInSlice.actions.closeModal());
      }, 1000);
    }
  };

  useEffect(() => {
    closeModal();
  });

  const handleClose = () => dispatch(signInSlice.actions.closeModal());

  return (
    <main style={{ display: 'grid' }}>
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
      <ThemeProvider theme={theme}>
        <form className="authorization-form" onSubmit={onSubmit}>
          <legend className="authorization-legend">
            <FormattedMessage id="SIGN_IN_FORM_HEADER" />
          </legend>
          <InputForm
            control={control}
            name="login"
            label={intl.formatMessage({ id: 'SIGN_UP_FORM_LOGIN_PLACEHOLDER' })}
            errorMessage={intl.formatMessage({ id: 'SIGN_IN_FOR_LOGIN_ERROR' })}
            maxLength={12}
            minLength={4}
            defaultValue=""
          />
          <InputForm
            control={control}
            name="password"
            label={intl.formatMessage({ id: 'SIGN_UP_FORM_PASSWORD_PLACEHOLDER' })}
            errorMessage={intl.formatMessage({ id: 'SIGN_IN_FOR_PASSWORD_ERROR' })}
            maxLength={8}
            minLength={4}
            defaultValue=""
          />
          <div>
            <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
              <FormattedMessage id="SIGN_IN_FORM_BUTTON" />
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
});
