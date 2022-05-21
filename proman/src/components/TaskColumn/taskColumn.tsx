import { Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './taskColumn.scss';
import { useAppDispatch } from '../../hooks/redux';
import { useCookies } from 'react-cookie';
import { changeColumn, deleteColumn, getAllColumns } from '../../store/asyncReducers/columnsSlice';
import { Controller, useForm } from 'react-hook-form';
import { TaskBlock } from '../taskBlock/taskBlock';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../utils/dragAndDropTypes';

type RegistrationFormInputs = {
  [nameColumn: string]: string;
};

export const TaskColumn: React.FC<{ columnId: string; title: string; order: number }> = ({
  columnId,
  title,
  order,
}) => {
  const { handleSubmit, control } = useForm<RegistrationFormInputs>();
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);

  const handleDeleteColumn = async () => {
    const boardId = localStorage.getItem('boardId');
    const token = cookies.token;
    if (columnId && boardId && token) {
      const result = await dispatch(deleteColumn({ token, boardId, columnId }));
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(getAllColumns({ token, boardId }));
      }
    }
  };

  const handleChangeColumn = handleSubmit(async ({ nameColumn }) => {
    const boardId = localStorage.getItem('boardId');
    const token = cookies.token;
    if (columnId && boardId && token) {
      const result = await dispatch(changeColumn({ token, boardId, columnId, order, nameColumn }));
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(getAllColumns({ token, boardId }));
      }
    }
  });

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TICKET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="task-column">
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
                autoComplete="on"
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
        {/* <form onSubmit={handleChangeColumn}>
          <input
            className="task-column__settings-title"
            placeholder="Column Name"
            defaultValue={title}
          ></input>
        </form> */}
        <IconButton style={{ color: '#a2a0a2', textTransform: 'none' }} aria-label="add task">
          <AddIcon style={{ color: '#a2a0a2' }} />
        </IconButton>
        <IconButton aria-label="delete column" onClick={handleDeleteColumn}>
          <DeleteIcon style={{ color: '#a2a0a2' }} />
        </IconButton>
      </div>
      <div className="task-column__list">
        <TaskBlock dragRef={dragRef} />
      </div>
      <Button style={{ color: '#a2a0a2', textTransform: 'none' }}>
        <AddIcon className="task-column__addTask-btn" style={{ color: '#a2a0a2' }} />
        Добавить задачу
      </Button>
    </div>
  );
};
