import React, { FC, useEffect, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { Column } from '../../components/Column/Column';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getAllData, boardSlice } from '../../store/asyncReducers/boardSlice';
import Loader from '../../components/Loader/Loader';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import putTicket from '../../requests/putTicket';
import './board.scss';
import putColumn from '../../requests/putColumn';

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
    board: { id, columns },
    isLoading,
  } = useAppSelector((state) => state.boardSlice);
  const { updateTicketsInColum, updateTicket, updateColumn } = boardSlice.actions;

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

  const onTaskDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'Column') {
      const copiedColumns = [...columns];
      const [removed] = copiedColumns.splice(source.index, 1);
      copiedColumns.splice(destination.index, 0, removed);
      dispatch(updateColumn(copiedColumns));
      const newColumn = {
        title: removed.title,
        order: destination.index + 1,
      };
      putColumn(cookies.token, id, removed.id, newColumn);
    } else {
      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns.find((item) => item.id === source.droppableId);
        const destColumn = columns.find((item) => item.id === destination.droppableId);
        if (sourceColumn && destColumn) {
          const sourceIndex = columns.indexOf(sourceColumn);
          const destIndex = columns.indexOf(destColumn);
          const sourceTasks = [...sourceColumn.tasks];
          const destTasks = [...destColumn.tasks];
          const [removed] = sourceTasks.splice(source.index, 1);
          destTasks.splice(destination.index, 0, removed);
          dispatch(
            updateTicket({
              sourceIndex: sourceIndex,
              sourceTasks: sourceTasks,
              destIndex: destIndex,
              destTasks: destTasks,
            })
          );
          const newTicket = {
            title: removed.title,
            order: destination.index + 1,
            description: removed.description,
            userId: removed.userId,
            boardId: id,
            columnId: destColumn.id,
          };
          putTicket(cookies.token, id, sourceColumn.id, removed.id, newTicket);
        }
      } else {
        columns.forEach((item, index) => {
          if (item.id === source.droppableId) {
            const copiedTickets = [...item.tasks];
            const [removed] = copiedTickets.splice(source.index, 1);
            copiedTickets.splice(destination.index, 0, removed);
            dispatch(updateTicketsInColum({ columnIndex: index, newArr: copiedTickets }));
            const newTicket = {
              title: removed.title,
              order: destination.index + 1,
              description: removed.description,
              userId: removed.userId,
              boardId: id,
              columnId: item.id,
            };
            putTicket(cookies.token, id, item.id, removed.id, newTicket);
          }
        });
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="board-page">
      <DragDropContext onDragEnd={(result) => onTaskDragEnd(result)}>
        <Droppable direction="horizontal" droppableId="Column" type="Column">
          {(provided) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="board-page__columns"
              >
                {columns.map((column, index) => (
                  <Column
                    key={column.id}
                    columnId={column.id}
                    title={column.title}
                    order={column.order}
                    tasks={column.tasks}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
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
