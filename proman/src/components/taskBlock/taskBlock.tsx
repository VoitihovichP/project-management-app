import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton, TextField } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import './taskBlock.scss';
import { Controller, useForm } from 'react-hook-form';

type RegistrationFormInputs = {
  [nameTask: string]: string;
};

export const TaskBlock: React.FC = () => {
  const { handleSubmit, control } = useForm<RegistrationFormInputs>();
  return (
    <div className="taskBlock">
      <div className="taskBlock-header">
        <div className="taskBlock-header">
          <IconButton className="taskBlock-header__status" aria-label="task status">
            <CheckCircleIcon style={{ color: '#a2a0a2' }} />
          </IconButton>
          <div className="taskBlock-header__name">
            <form>
              <Controller
                name="nameTask"
                control={control}
                defaultValue=""
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
          </div>
        </div>
        <IconButton className="taskBlock-delete" aria-label="delete task">
          <DeleteIcon style={{ color: '#a2a0a2' }} />
        </IconButton>
      </div>
      <div className="taskBlock-info">
        <div className="taskBlock-info__person">
          <IconButton aria-label="person">
            <PersonIcon style={{ color: '#a2a0a2' }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
