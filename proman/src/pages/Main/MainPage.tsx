import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteBoard, getBoards } from '../../store/asyncReducers/boardSlice';
import { Button } from '@mui/material';
import './mainPage.scss';
import CreateBoardForm from '../../components/CreateBoardForm/CreateBoardForm';
import BoardItem from '../../components/BoardItem/BoardItem';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { boardIdSlice } from '../../store/reducers/boardIdSlice';

const MainPage: FC = () => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boardReducer);
  const { deleteBoardId } = useAppSelector((state) => state.boardIdReducer);
  const { changeBoardId } = boardIdSlice.actions;
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

  const handleOpenEditForm = () => {
    setIsEdit(true);
  };

  const handleCloseEditForm = () => {
    setIsEdit(false);
  };

  const handleDeleteBoard = async () => {
    await dispatch(deleteBoard({ id: deleteBoardId, token: token }));
    await dispatch(getBoards({ token: token }));
    dispatch(changeBoardId(''));
    handleCloseConfirm();
  };

  return (
    <div className="main-page">
      {isConfirm && (
        <ConfirmationModal cancelDelete={handleCloseConfirm} deleteBoard={handleDeleteBoard} />
      )}
      {isEdit && <CreateBoardForm closeForm={handleCloseEditForm} isEdit={true} />}
      {isCreate && <CreateBoardForm closeForm={handleCloseCreate} />}
      <div className={`main-page__boards ${boards.length > 0 ? '' : 'main-page__boards_empty'}`}>
        {boards.length > 0 ? (
          boards.map(({ title, id }) => (
            <BoardItem
              title={title}
              boardId={id}
              openConfirm={handleOpenConfirm}
              openEdit={handleOpenEditForm}
              key={id}
            />
          ))
        ) : (
          <div className="main-page__message">
            <p className="main-page__empty">Список ваших проектов пуст</p>
          </div>
        )}
        <Button variant="outlined" className="main-page__create" onClick={() => handleOpenCreate()}>
          Добавить проект
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
