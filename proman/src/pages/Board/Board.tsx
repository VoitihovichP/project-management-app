import React, { FC, useEffect, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { Column } from '../../components/Column/Column';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getAllData } from '../../store/asyncReducers/boardSlice';
import Loader from '../../components/Loader/Loader';
import './board.scss';

import { injectIntl } from 'react-intl';

type RegistrationFormInputs = {
  [nameColumn: string]: string;
};

const Board: FC = injectIntl(({ intl }) => {
  const [isShowInput, setIsShowInput] = useState(false);
  const [cookies] = useCookies(['token']);
  const { handleSubmit, control, reset } = useForm<RegistrationFormInputs>();
  const dispatch = useAppDispatch();
  const {
    board: { columns },
    isLoading,
  } = useAppSelector((state) => state.boardSlice);

  const getData = async () => {
    const boardId = localStorage.getItem('boardId');
    const token = cookies.token;
    if (token && boardId) {
      dispatch(getAllData({ token, boardId }));
    }
  };

  const handleCreateColumn = handleSubmit(async ({ nameColumn }) => {
    const boardId = localStorage.getItem('boardId');
    const order = columns.length + 1;
    if (cookies.token && boardId) {
      const token = cookies.token;
      dispatch(createColumn({ nameColumn, order, token, boardId }));
    }
    reset();
    setIsShowInput(false);
  });

  const handleClickAddColumn = () => {
    setIsShowInput(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="board-page">
      <div className="board-page__columns">
        {columns.map((column) => (
          <Column
            key={column.id}
            columnId={column.id}
            title={column.title}
            order={column.order}
            tasks={column.tasks}
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
            {intl.formatMessage({ id: 'BOARD_ADD_SECTION' })}
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
                required: intl.formatMessage({ id: 'SIGN_IN_FORM_EMPTY_FIELD_ERROR' }),
              }}
            />
          </form>
        )}
      </div>
    </div>
  );
});

export default Board;
