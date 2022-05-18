import React, { FC, useState, useEffect } from 'react';
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

const Header: FC = () => {
  const [isScrolled, setScroll] = useState(false);

  const highlightHeader = (): void => (window.pageYOffset > 0 ? setScroll(true) : setScroll(false));

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', highlightHeader);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', highlightHeader);
    };
  });

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
      transform: 'translateX(3.5px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(17.5px)',
        '& .MuiSwitch-thumb:before': {
          content: "''",
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#8796A5' : isScrolled ? '#a2a0a2' : '#ffffff',
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
      backgroundColor:
        theme.palette.mode === 'dark' ? '#8796A5' : isScrolled ? '#a2a0a2' : '#ffffff',
      borderRadius: 20 / 2,
    },
  }));

  const [state, setState] = React.useState({
    englishVersion: false,
  });

  const handleLangSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

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
    <header className={isScrolled ? 'header header__scrolled' : 'header'}>
      <div className="header_left-block">
        <NavLink to="./">
          <h1 className="header_left-block_title">Pro-Man</h1>
        </NavLink>
        <Stack
          className={
            isScrolled
              ? 'header_left-block_language-switch header_left-block_language-switch__scrolled'
              : 'header_left-block_language-switch'
          }
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Typography className="header_left-block_language-switch_left-text">RU</Typography>
          <FormControlLabel
            control={
              <MaterialUISwitch
                checked={state.englishVersion}
                onChange={handleLangSwitch}
                name="englishVersion"
                sx={{ m: 1 }}
              />
            }
            label=""
          />
          <Typography className="header_left-block_language-switch_right-text">EN</Typography>
        </Stack>
      </div>
      {isLogin ? (
        <div className="header_right-block">
          <div className="header_right-block_login-greeting">
            Здравствуйте, <span>{`${cookies.login}`}</span>
          </div>
          <nav className="header_right-block_nav-buttons">
            <NavLink to="/main">
              <Button variant="contained">К&nbsp;доскам</Button>
            </NavLink>
            <Button variant="contained" onClick={handleLogOut}>
              Выйти
            </Button>
          </nav>
        </div>
      ) : (
        <div className="header_right-block">
          <nav className="header_right-block_nav-buttons">
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
