import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

import './createBoardForm.scss';
import CloseFormBtn from '../CloseFormBtn/CloseFormBtn';

import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getBoards, postBoards, updateBoard } from '../../store/asyncReducers/boardSlice';
import { CreateFormBtn } from '../../types/enums';

type CreateBoardInput = {
  boardTitle: string;
};

type CreateBoardFormProps = {
  closeForm: () => void;
  isEdit?: boolean;
};

const CreateBoardForm: FC<CreateBoardFormProps> = ({ closeForm, isEdit }) => {
  const dispatch = useAppDispatch();
  const { deleteBoardId } = useAppSelector((state) => state.boardIdReducer);
  const [cookie] = useCookies(['token']);
  const { token } = cookie;

  const { handleSubmit, control, reset } = useForm<CreateBoardInput>({
    mode: 'onChange',
  });

  const createProject = handleSubmit(async ({ boardTitle }) => {
    if (isEdit) {
      await dispatch(updateBoard({ id: deleteBoardId, newTitle: boardTitle, token: token })); //изменения борда
      await dispatch(getBoards({ token: token })); //получение актуальных бордов
    } else {
      await dispatch(postBoards({ title: boardTitle, token: token }));
    }
    closeForm();
    reset();
  });

  return (
    <div className="create-board">
      <form className="create-board__form" onSubmit={createProject}>
        <CloseFormBtn closeFormFunc={closeForm} />
        <Controller
          name="boardTitle"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              id="outlined-basic"
              label="Название проекта"
              className="create-board__title"
              variant="outlined"
              autoComplete="off"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={
                error && (error.message || 'Длинна названия должна быть от 3 до 15 символов')
              }
            />
          )}
          rules={{ required: 'Это поле не должно быть пустым', maxLength: 15, minLength: 3 }}
        />
        <Button type="submit" variant="outlined" className="main-page__create">
          {isEdit ? CreateFormBtn.EDIT : CreateFormBtn.CREATE}
        </Button>
      </form>
    </div>
  );
};

export default CreateBoardForm;
