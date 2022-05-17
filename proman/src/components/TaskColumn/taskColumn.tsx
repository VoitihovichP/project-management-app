import { Button, IconButton } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';

const addTaskButton = {
  color: '#a2a0a2',
  'text-transform': 'none',
};

import './taskColumn.scss';
import { TaskBlock } from '../taskBlock/taskBlock';
export const TaskColumn: React.FC = () => {
  return (
    <div className="task-column">
      <div className="task-column__settings">
        <input className="task-column__settings-title" placeholder="Column Name"></input>
        <IconButton style={addTaskButton} aria-label="add task">
          <AddIcon style={{ color: '#a2a0a2' }} />
        </IconButton>
      </div>
      <div className="task-column__list">
        <TaskBlock />
        <TaskBlock />
        <TaskBlock />
        <TaskBlock />
        <TaskBlock />
        <TaskBlock />
        <TaskBlock />
      </div>
      <Button style={addTaskButton}>
        <AddIcon className="task-column__addTask-btn" style={{ color: '#a2a0a2' }} />
        Добавить задачу
      </Button>
    </div>
  );
};
