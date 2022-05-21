import React, { FC, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { formSlice } from '../../store/reducers/formSlice';
import { useCookies } from 'react-cookie';
import { signInSlice } from '../../store/asyncReducers/signInSlice';
import { signUpSlice } from '../../store/asyncReducers/signUpSlice';
import LangSwitch from '../LangSwitch/LangSwitch';
import Button from '@mui/material/Button';
import ProManLogo from '../../assets/svg/pro-man-logo2.svg';
import './header.scss';

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
          <img alt="Pro-Man App" src={ProManLogo}></img>
          {/* <h1 className="header_left-block_title">Pro-Man</h1> */}
        </NavLink>
        <LangSwitch />
      </div>
      {isLogin ? (
        <div className="header_right-block">
          <div className="header_right-block_login-greeting">
            Здравствуйте, <span>{`${cookies.login}`}</span>
          </div>
          <nav className="header_right-block_nav-buttons">
            <NavLink to="/main">
              <Button variant="contained">Перейти&nbsp;к&nbsp;доскам</Button>
            </NavLink>
            <NavLink to="/profile">
              <Button variant="contained">Редактировать&nbsp;профиль</Button>
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
