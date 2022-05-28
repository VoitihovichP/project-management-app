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

import { injectIntl, FormattedMessage } from 'react-intl';

const Profile: FC = injectIntl(({ intl }) => {
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
      <h2 className="profile-page_title">{intl.formatMessage({ id: 'PROFILE_HEADER' })}</h2>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': {
            m: 1,
            width: '45ch',
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
          label={intl.formatMessage({ id: 'PROFILE_USERNAME_PLACEHOLDER' })}
          errorMessage={intl.formatMessage({ id: 'SIGN_UP_FORM_USERNAME_ERROR' })}
          maxLength={12}
          minLength={3}
          defaultValue={cookies.login}
        />
        <InputForm
          control={control}
          name="login"
          label={intl.formatMessage({ id: 'PROFILE_LOGIN_PLACEHOLDER' })}
          errorMessage={intl.formatMessage({ id: 'SIGN_UP_FORM_LOGIN_ERROR' })}
          maxLength={12}
          minLength={4}
          defaultValue={cookies.login}
        />
        <InputForm
          control={control}
          name="password"
          label={intl.formatMessage({ id: 'PROFILE_PASSWORD_PLACEHOLDER' })}
          errorMessage={intl.formatMessage({ id: 'SIGN_UP_FORM_PASSWORD_ERROR' })}
          maxLength={8}
          minLength={4}
          defaultValue={cookies.password}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
        {intl.formatMessage({ id: 'PROFILE_SAVE_BUTTON' })}
      </Button>
      <Button variant="contained">{intl.formatMessage({ id: 'PROFILE_DELETE_BUTTON' })}</Button>
      {/*<PopUp
        open={modal.isOpen}
        handleClose={handleClose}
        title={modal.title}
        message={modal.message}
      />*/}
    </main>
  );
});

export default Profile;
