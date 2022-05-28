import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/dragAndDropTypes';
import { ConnectDragSource } from 'react-dnd';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useAppDispatch } from '../../hooks/redux';
import { changeTask, createTask, deleteTask } from '../../store/asyncReducers/boardSlice';
import './task.scss';

type RegistrationFormInputs = {
  [nameTask: string]: string;
  descriptionTask: string;
};

export const TaskBlock: React.FC<{
  title?: string;
  description?: string;
  boardId?: string;
  order?: number;
  columnId: string;
  isTemplate?: boolean;
  taskId?: string;
}> = ({ columnId, isTemplate, taskId, description, title, order }) => {
  const { handleSubmit, control } = useForm<RegistrationFormInputs>();
  const [cookies] = useCookies(['token']);
  const dispatch = useAppDispatch();
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TICKET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const token = cookies.token;

  const handleSubmitTemplateTask = handleSubmit(async ({ nameTask, description }) => {
    const boardId = localStorage.getItem('boardId');
    const decoded: {
      iat?: number;
      login?: string;
      userId?: string;
    } = jwtDecode<JwtPayload>(token);
    if (isTemplate) {
      if (nameTask && boardId && decoded.userId && columnId && description) {
        const userId: string = decoded.userId;
        dispatch(createTask({ nameTask, token, boardId, columnId, description, userId }));
      }
    } else {
      if (token && boardId && columnId && taskId && order && description && decoded.userId) {
        const userId: string = decoded.userId;
        dispatch(
          changeTask({ token, boardId, columnId, taskId, order, description, userId, nameTask })
        );
      }
    }
  });

  const handleDeleteTask = async () => {
    const boardId = localStorage.getItem('boardId');
    if (boardId && columnId && taskId && token) {
      dispatch(deleteTask({ token, boardId, columnId, taskId }));
    }
  };

  return (
    <div ref={dragRef} className="taskBlock create_task">
      <div className="taskBlock-header">
        <div className="taskBlock-header_options">
          {isTemplate ? null : (
            <IconButton className="taskBlock-header_options-status" aria-label="task status">
              <CheckCircleIcon style={{ color: '#a2a0a2' }} />
            </IconButton>
          )}
          <div className="taskBlock-header_options-name">
            <form onSubmit={handleSubmitTemplateTask}>
              <Controller
                name="nameTask"
                control={control}
                defaultValue={title ? title : ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    id="outlined-basic"
                    size="small"
                    variant="standard"
                    autoComplete="off"
                    value={value}
                    placeholder="Название задачи"
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
              <Controller
                name="description"
                control={control}
                defaultValue={description ? description : ''}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    variant="outlined"
                    autoComplete="off"
                    placeholder={'Описание'}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error && error.message}
                    style={{ color: '#a2a0a2' }}
                    InputProps={{
                      className: 'descriptionTask',
                    }}
                  />
                )}
                rules={{
                  required: 'Поле должно быть заполнено',
                }}
              />
              {isTemplate ? <Button type="submit">создать</Button> : null}
            </form>
          </div>
          {isTemplate ? null : (
            <IconButton
              onClick={handleDeleteTask}
              className="taskBlock-header_options-delete"
              aria-label="delete task"
            >
              <DeleteIcon style={{ color: '#a2a0a2' }} />
            </IconButton>
          )}
        </div>
      </div>
      <div className="taskBlock-info">
        <div className="taskBlock-info__person">
          {isTemplate ? null : (
            <IconButton aria-label="person">
              <PersonIcon style={{ color: '#a2a0a2' }} />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};
