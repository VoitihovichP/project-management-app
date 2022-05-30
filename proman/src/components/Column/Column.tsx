import { Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAppDispatch } from '../../hooks/redux';
import { useCookies } from 'react-cookie';
import { changeColumn, deleteColumn } from '../../store/asyncReducers/boardSlice';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Task } from '../Task/Task';
import { TaskType } from '../../types/types';
import './column.scss';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { useIntl } from 'react-intl';

type RegistrationFormInputs = {
  [nameColumn: string]: string;
};

export const Column: React.FC<{
  columnId: string;
  title: string;
  order: number;
  tasks: TaskType[];
  index: number;
}> = ({ columnId, title, order, tasks, index }) => {
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

  useEffect(() => {
    window.addEventListener('click', handleCloseTemplateTask);
    return () => {
      window.removeEventListener('click', handleCloseTemplateTask);
    };
  }, []);

  return (
    <Draggable draggableId={columnId ? columnId : 'Task'} index={index ? index : 0}>
      {(provided) => {
        return (
          <div
            className="task-column"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isShowModal ? (
              <ConfirmationModal
                cancelDelete={handleCancelDeleteColumn}
                deleteBoard={handleDeleteColumn}
              />
            )}
            rules={{
              required: `${useIntl().formatMessage({ id: 'SIGN_IN_FORM_EMPTY_FIELD_ERROR' })}`,
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
            <Droppable droppableId={columnId} type="Task">
              {(provided) => {
                return (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="task-column__list"
                  >
                    {tasks.map((task, index) => {
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
                          index={index}
                        />
                      );
                    })}
                    {isShowTemplateTask && <Task columnId={columnId} isTemplate={true} />}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
      <Button
        className="create_task"
        onClick={handleOpenTemplateTask}
        style={{ color: '#a2a0a2', textTransform: 'none' }}
      >
        <AddIcon className="task-column__addTask-btn" style={{ color: '#a2a0a2' }} />
        {useIntl().formatMessage({ id: 'BOARD_ADD_TASK' })}
      </Button>
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
      }}
    </Draggable>
  );
};
