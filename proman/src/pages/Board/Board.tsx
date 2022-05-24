import React, { FC, useEffect, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { TaskColumn } from '../../components/TaskColumn/taskColumn';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getAllColumns } from '../../store/asyncReducers/columnsSlice';
import Loader from '../../components/Loader/Loader';
import './board.scss';

type RegistrationFormInputs = {
  [nameColumn: string]: string;
};

const Board: FC = () => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [cookies] = useCookies(['token']);
  const { handleSubmit, control, reset } = useForm<RegistrationFormInputs>();
  const dispatch = useAppDispatch();
  const { columns, isLoading } = useAppSelector((state) => state.columnSlice);

  const handleCreateColumn = handleSubmit(({ nameColumn }) => {
    const boardId = localStorage.getItem('boardId');
    const order = columns.length + 1;
    if (cookies.token && boardId) {
      const token = cookies.token;
      dispatch(createColumn({ nameColumn, order, token, boardId }));
    }
    reset();
    setIsShowInput(false);
  });

  const getColumns = async () => {
    const boardId = localStorage.getItem('boardId');
    const token = cookies.token;
    if (token && boardId) {
      dispatch(getAllColumns({ token, boardId }));
    }
  };

  const handleClickAddColumn = () => {
    setIsShowInput(true);
  };

  useEffect(() => {
    getColumns();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="board-page">
      <div className="board-page__columns">
        {columns.map((columnn) => (
          <TaskColumn
            key={columnn.id}
            columnId={columnn.id}
            title={columnn.title}
            order={columnn.order}
          />
        ))}
      </div>
      <div className="board-page__addBlock">
        {!isShowInput ? (
          <IconButton
            onClick={handleClickAddColumn}
            style={{ textTransform: 'none', fontSize: '16px', color: '#a2a0a2' }}
            aria-label="add task"
          >
            <AddIcon style={{ color: '#a2a0a2' }} />
            Добавить секцию
          </IconButton>
        ) : (
          <form onSubmit={handleCreateColumn}>
            <Controller
              name="nameColumn"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  id="outlined-basic"
                  size="small"
                  variant="outlined"
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error && error.message}
                  style={{ color: '#a2a0a2' }}
                  InputProps={{
                    className: 'nameColumn',
                  }}
                />
              )}
              rules={{
                required: 'Поле должно быть заполнено',
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Board;
