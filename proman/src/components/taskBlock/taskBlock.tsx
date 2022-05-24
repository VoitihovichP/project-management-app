import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/dragAndDropTypes';
import { ConnectDragSource } from 'react-dnd';
import './taskBlock.scss';
import { Controller, useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';
type RegistrationFormInputs = {
  [nameTask: string]: string;
  descriptionTask: string;
};

export const TaskBlock: React.FC<{ columnId: string; isTemplate?: boolean }> = ({
  columnId,
  isTemplate,
}) => {
  const { handleSubmit, control } = useForm<RegistrationFormInputs>();
  const [cookies] = useCookies(['token']);

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TICKET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChangeName = handleSubmit(async ({ nameTask, descriptionTask }) => {
    if (isTemplate) {
      const boardId = localStorage.getItem('boardId');
      const token = cookies.token;
      const decoded: {
        iat?: number;
        login?: string;
        userId?: string;
      } = jwtDecode<JwtPayload>(token);
      if (nameTask && boardId && decoded.userId && columnId && descriptionTask) {
        console.log(nameTask, boardId, decoded.userId, descriptionTask);
      }
    }
  });

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
            <form onSubmit={handleChangeName}>
              <Controller
                name="nameTask"
                control={control}
                defaultValue="Название задачи"
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
              <Controller
                name="descriptionTask"
                control={control}
                defaultValue="Описание"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    variant="outlined"
                    autoComplete="off"
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
              <Button type="submit">создать</Button>
            </form>
          </div>
          {isTemplate ? null : (
            <IconButton className="taskBlock-header_options-delete" aria-label="delete task">
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
