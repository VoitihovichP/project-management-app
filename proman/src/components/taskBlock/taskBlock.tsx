import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';
import './taskBlock.scss';

export const TaskBlock: React.FC = () => {
  return (
    <div className="taskBlock">
      <div className="taskBlock-header">
        <div className="taskBlock-header">
          <IconButton className="taskBlock-header__status" aria-label="task status">
            <CheckCircleIcon style={{ color: '#a2a0a2' }} />
          </IconButton>
          <div className="taskBlock-header__name">Test</div>
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
