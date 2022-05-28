import React, { FC, useState, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/userSlice';
import { signInSlice } from '../../store/asyncReducers/signInSlice';
import { signUpSlice } from '../../store/asyncReducers/signUpSlice';
import { mainPageSlice } from '../../store/asyncReducers/mainPageSlice';
import { useCookies } from 'react-cookie';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WorkIcon from '@mui/icons-material/Work';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import StyledMenu from './StyledMenu';
import './burger-menu.scss';

const BurgerMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { removeToken } = signInSlice.actions;
  const { clear } = signUpSlice.actions;
  const { clearBoards } = mainPageSlice.actions;
  const dispatch = useAppDispatch();
  const { userLogin } = userSlice.actions;
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['login', 'password', 'token']);
  const handleLogOut = () => {
    dispatch(removeToken());
    dispatch(clear());
    dispatch(clearBoards());
    removeCookie('login');
    removeCookie('password');
    removeCookie('token');
    dispatch(userLogin(false));
    navigate('/'); // редирект на welcome при логауте
    setAnchorEl(null);
  };

  return (
    <div className="header_right-block_nav-buttons_burger-menu">
      <Button
        className="header_right-block_nav-buttons_burger-menu_button"
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        startIcon={<KeyboardArrowDownIcon />}
      >
        Меню
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleClose}
          className="header_right-block_nav-buttons_burger-menu_button"
        >
          <NavLink to="/main" className="header_right-block_nav-buttons_burger-menu_button_text">
            <WorkIcon />
            Мои проекты
          </NavLink>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleClose}
          className="header_right-block_nav-buttons_burger-menu_button"
        >
          <NavLink to="/main" className="header_right-block_nav-buttons_burger-menu_button_text">
            <CreateNewFolderIcon />
            Новый проект
          </NavLink>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleClose}
          className="header_right-block_nav-buttons_burger-menu_button"
        >
          <NavLink to="/profile" className="header_right-block_nav-buttons_burger-menu_button_text">
            <AccountBoxIcon />
            Мой профиль
          </NavLink>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleClose}
          className="header_right-block_nav-buttons_burger-menu_button"
        >
          <NavLink to="/" className="header_right-block_nav-buttons_burger-menu_button_text">
            <InfoIcon />О приложении
          </NavLink>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleLogOut}
          className="header_right-block_nav-buttons_burger-menu_button"
        >
          <NavLink to="/" className="header_right-block_nav-buttons_burger-menu_button_text">
            <LogoutIcon />
            Выход
          </NavLink>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default BurgerMenu;
