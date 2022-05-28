import { Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAppDispatch } from '../../hooks/redux';
import { useCookies } from 'react-cookie';
import { changeColumn, deleteColumn } from '../../store/asyncReducers/boardSlice';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Task } from '../Task/Task';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/dragAndDropTypes';
import { TaskType } from '../../types/types';
import './column.scss';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

type RegistrationFormInputs = {
  [nameColumn: string]: string;
};

export const Column: React.FC<{
  columnId: string;
  title: string;
  order: number;
  tasks: TaskType[];
}> = ({ columnId, title, order, tasks }) => {
  const [isShowTemplateTask, setIsShowTemplateTask] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const { handleSubmit, control } = useForm<RegistrationFormInputs>();
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);

  const handleClickDeleteColumn = () => {
    setIsShowModal(true);
  };

  const handleDeleteColumn = async () => {
    setIsShowModal(false);
    const boardId = localStorage.getItem('boardId');
    const token = cookies.token;
    if (columnId && boardId && token) {
      dispatch(deleteColumn({ token, boardId, columnId }));
    }
  };

  const handleCancelDeleteColumn = () => {
    setIsShowModal(false);
  };

  const handleChangeColumn = handleSubmit(({ nameColumn }) => {
    const boardId = localStorage.getItem('boardId');
    const token = cookies.token;
    if (columnId && boardId && token) {
      dispatch(changeColumn({ token, boardId, columnId, order, nameColumn }));
    }
  });

  const handleOpenTemplateTask = () => {
    setIsShowTemplateTask(true);
  };

  const handleCloseTemplateTask = (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    if (!target.closest('.create_task') && !target.classList.contains('create_task')) {
      setIsShowTemplateTask(false);
    }
  };

  const [, dropRef] = useDrop(() => ({
    accept: ItemTypes.TICKET,
    drop: () => console.log(columnId),
  }));

  useEffect(() => {
    window.addEventListener('click', handleCloseTemplateTask);
    return () => {
      window.removeEventListener('click', handleCloseTemplateTask);
    };
  }, []);

  return (
    <div className="task-column">
      {isShowModal ? (
        <ConfirmationModal
          cancelDelete={handleCancelDeleteColumn}
          deleteBoard={handleDeleteColumn}
        />
      ) : null}
      <div className="task-column__settings">
        <form onSubmit={handleChangeColumn}>
          <Controller
            name="nameColumn"
            control={control}
            defaultValue={title}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                id="outlined-basic"
                size="small"
                variant="standard"
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
        <IconButton style={{ color: '#a2a0a2', textTransform: 'none' }} aria-label="add task">
          <AddIcon style={{ color: '#a2a0a2' }} />
        </IconButton>
        <IconButton aria-label="delete column" onClick={handleClickDeleteColumn}>
          <DeleteIcon style={{ color: '#a2a0a2' }} />
        </IconButton>
      </div>

      <div className="task-column__list">
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              title={task.title}
              description={task.description}
              boardId={task.boardId}
              columnId={columnId}
              taskId={task.id}
              order={task.order}
              isTemplate={false}
            />
          );
        })}
        {isShowTemplateTask && <Task columnId={columnId} isTemplate={true} />}
      </div>

      <Button
        className="create_task"
        onClick={handleOpenTemplateTask}
        style={{ color: '#a2a0a2', textTransform: 'none' }}
      >
        <AddIcon className="task-column__addTask-btn" style={{ color: '#a2a0a2' }} />
        Добавить задачу
      </Button>
    </div>
  );
};
