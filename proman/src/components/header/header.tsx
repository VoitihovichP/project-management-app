import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './header.scss';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { NavLink, useNavigate } from 'react-router-dom';
import { formSlice } from '../../store/reducers/formSlice';
import { useCookies } from 'react-cookie';
import { signInSlice } from '../../store/asyncReducers/signInSlice';
import { signUpSlice } from '../../store/asyncReducers/signUpSlice';

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
  const { isLogin } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userLogin } = userSlice.actions;
  const { removeToken } = signInSlice.actions;
  const { clear } = signUpSlice.actions;
  const { showSignUpForm } = formSlice.actions;
  const [cookies, , removeCookie] = useCookies(['login', 'password', 'token']);

  const handleLogIn = (isShowSignUpform: boolean) => {
    dispatch(showSignUpForm(isShowSignUpform));
  };

  const handleLogOut = () => {
    dispatch(removeToken());
    dispatch(clear());
    removeCookie('login');
    removeCookie('password');
    removeCookie('token');
    dispatch(userLogin(false));
    navigate('/'); // редирект на welcome при логауте
  };

  const isLoginUser = () => {
    if (cookies.login && cookies.password && cookies.token) {
      dispatch(userLogin(true));
    }
  };

  useEffect(() => {
    isLoginUser();
  }, []);

  return (
    <header>
      <div className="header_left-block">
        <NavLink to="./">
          <h1>Pro-Man</h1>
        </NavLink>
        <Stack className="language-switch" direction="row" spacing={1} alignItems="center">
          <Typography className="language-switch_left-text">RU</Typography>
          <FormControlLabel control={<MaterialUISwitch sx={{ m: 1 }} />} label="" />
          <Typography className="language-switch_right-text">EN</Typography>
        </Stack>
      </div>
      <div className="header_right-block">
        {isLogin ? (
          <div className="login-greetings">
            <div className="login-greetings__text">
              Здравствуйте, <span>{`${cookies.login}`}</span>
            </div>
            <Button variant="contained" onClick={handleLogOut}>
              Выйти
            </Button>
          </div>
        ) : (
          <>
            <NavLink to="./authorization">
              <Button
                className="login-button"
                variant="contained"
                onClick={() => handleLogIn(false)}
              >
                Вход
              </Button>
            </NavLink>
            <NavLink to="./authorization">
              <Button variant="contained" onClick={() => handleLogIn(true)}>
                Регистрация
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
