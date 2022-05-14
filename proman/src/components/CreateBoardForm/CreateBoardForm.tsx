import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

import './createBoardForm.scss';
import CloseFormBtn from '../CloseFormBtn/CloseFormBtn';

import { useCookies } from 'react-cookie';
import { useAppDispatch } from '../../hooks/redux';
import { postBoards } from '../../store/asyncReducers/boardSlice';

type CreateBoardInput = {
  boardTitle: string;
};

type CreateBoardFormProps = {
  closeForm: () => void;
};

const CreateBoardForm: FC<CreateBoardFormProps> = ({ closeForm }) => {
  const dispatch = useAppDispatch();
  const [cookie] = useCookies(['token']);
  const { token } = cookie;

  const { handleSubmit, control, reset } = useForm<CreateBoardInput>({
    mode: 'onChange',
  });

  const createProject = handleSubmit(async ({ boardTitle }) => {
    await dispatch(postBoards({ title: boardTitle, token: token }));
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
          Создать проект
        </Button>
      </form>
    </div>
  );
};

export default CreateBoardForm;
