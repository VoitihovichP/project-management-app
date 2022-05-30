import React, { FC, useState } from 'react';
import { Button } from '@mui/material';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { RegistrationFormInputs } from '../../types/types';
import { InputForm } from '../../components/InputForm/InputForm';
import { injectIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { PopUp } from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { deleteUser, signUpSlice, updateUser } from '../../store/asyncReducers/signUpSlice';
import './profile.scss';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { userSlice } from '../../store/reducers/userSlice';
import { signInSlice } from '../../store/asyncReducers/signInSlice';
import { mainPageSlice } from '../../store/asyncReducers/mainPageSlice';

const Profile: FC = injectIntl(({ intl }) => {
  const dispatch = useAppDispatch();
  const { modal, isLoading } = useAppSelector((state) => state.signUpSlice);
  const [cookies, setCookie, removeCookie] = useCookies(['login', 'password', 'token']);
  const [isDelete, setIsDelete] = useState(false);
  const { clear } = signUpSlice.actions;
  const { userLogin } = userSlice.actions;
  const { removeToken } = signInSlice.actions;
  const { clearBoards } = mainPageSlice.actions;
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<RegistrationFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(async ({ name, login, password }) => {
    const token: string = cookies.token;
    const decoded: {
      iat?: number;
      login?: string;
      userId?: string;
    } = jwtDecode<JwtPayload>(token);
    const userId = decoded.userId;
    if (isDelete) {
      if (token && userId) {
        navigate('/');
        const result = await dispatch(deleteUser({ token, userId }));
        if (result.meta.requestStatus === 'fulfilled') {
          dispatch(removeToken());
          dispatch(clear());
          dispatch(clearBoards());
          removeCookie('login');
          removeCookie('password');
          removeCookie('token');
          dispatch(userLogin(false));
          setTimeout(() => {
            navigate('/');
          }, 50);
        }
      }
    } else {
      if (name && login && password && token && userId) {
        const result = await dispatch(updateUser({ name, login, password, token, userId }));
        if (result.meta.requestStatus === 'fulfilled') {
          setCookie('login', login, { path: '/', maxAge: 86400 });
          setCookie('password', password, { path: '/', maxAge: 86400 });
          reset();
        }
      }
    }
  });

  const handleClose = () => dispatch(signUpSlice.actions.closeModal());

  return isLoading ? (
    <Loader />
  ) : (
    <div className="profile-page">
      <h2 className="profile-page_title">{intl.formatMessage({ id: 'PROFILE_HEADER' })}</h2>
      <form className="profile-page__form" autoComplete="off" onSubmit={onSubmit}>
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
        <Button
          className="profile-page__form-btn"
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          onClick={() => {
            setIsDelete(false);
          }}
        >
          {intl.formatMessage({ id: 'PROFILE_SAVE_BUTTON' })}
        </Button>
        <Button
          className="profile-page__form-btn"
          type="submit"
          color="primary"
          variant="contained"
          onClick={() => {
            setIsDelete(true);
          }}
          disabled={!isValid}
        >
          {intl.formatMessage({ id: 'PROFILE_DELETE_BUTTON' })}
        </Button>
      </form>
      <PopUp
        open={modal.isOpen}
        handleClose={handleClose}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
});

export default Profile;
