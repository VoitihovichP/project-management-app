import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoards } from '../../store/asyncReducers/boardSlice';
import { Button } from '@mui/material';
import './mainPage.scss';
import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';
import BoardItem from '../../components/BoardItem/BoardItem';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const MainPage: FC = () => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
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

  const handleOpenCreate = () => {
    setIsCreate(true);
  };

  const handleCloseCreate = () => {
    setIsCreate(false);
  };

  const handleOpenConfirm = () => {
    setIsConfirm(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirm(false);
  };

  return (
    <div className="main-page">
      {isConfirm && <ConfirmationModal cancelDelete={handleCloseConfirm} />}
      {isCreate && <CreateBoardForm closeForm={handleCloseCreate} />}
      <div className={`main-page__boards ${boards.length > 0 ? '' : 'main-page__boards_empty'}`}>
        {boards.length > 0 ? (
          boards.map((item) => (
            <BoardItem title={item.title} openConfirm={handleOpenConfirm} key={item.id} />
          ))
        ) : (
          <div className="main-page__message">
            <p className="main-page__empty">Список ваших проектов пуст</p>
            <Button
              variant="outlined"
              className="main-page__create"
              onClick={() => handleOpenCreate()}
            >
              Создать проект
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
