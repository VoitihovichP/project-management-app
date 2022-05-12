import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoards } from '../../store/asyncReducers/getBoardSlice';
import { Button } from '@mui/material';
import './mainPage.scss';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boardReducer);
  const [cookie] = useCookies(['token']);
  const { token } = cookie;

  useEffect(() => {
    dispatch(getBoards({ token: token }));
  }, [token]);

  return (
    <div className="main-page">
      <div className={`main-page__boards ${boards.length > 0 ? '' : 'main-page__boards_empty'}`}>
        {boards.length > 0 ? (
          <p>Exemple</p> //будующие борды
        ) : (
          <div className="main-page__message">
            <p className="main-page__empty">Список ваших проектов пуст</p>
            <Button variant="outlined" className="main-page__create">
              Создать проект
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
