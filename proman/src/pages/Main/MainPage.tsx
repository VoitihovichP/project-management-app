import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoards } from '../../store/asyncReducers/boardSlice';
import { Button } from '@mui/material';
import './mainPage.scss';
import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';

const MainPage: FC = () => {
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boardReducer);
  const [cookie] = useCookies(['token']);
  const { token } = cookie;

  useEffect(() => {
    if (boards.length === 0) {
      dispatch(getBoards({ token: token }));
    }
  }, [token]);

  const handleOpen = () => {
    setIsCreate(true);
  };

  const handleClose = () => {
    setIsCreate(false);
  };

  return (
    <div className="main-page">
      {isCreate && <CreateBoardForm closeForm={handleClose} />}
      <div className={`main-page__boards ${boards.length > 0 ? '' : 'main-page__boards_empty'}`}>
        {boards.length > 0 ? (
          <p>Exemple</p> //будующие борды
        ) : (
          <div className="main-page__message">
            <p className="main-page__empty">Список ваших проектов пуст</p>
            <Button variant="outlined" className="main-page__create" onClick={() => handleOpen()}>
              Создать проект
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
