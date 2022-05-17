import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import AddIcon from '@material-ui/icons/Add';
import { TaskColumn } from '../../components/TaskColumn/taskColumn';
import './board.scss';

const addTaskButton = {
  color: '#a2a0a2',
  'text-transform': 'none',
  'font-size': '16px',
};

const Board: FC = () => {
  return (
    <main className="board-page">
      <div className="board-page__columns">
        <TaskColumn />
        <TaskColumn />
        <TaskColumn />
      </div>
      <div className="board-page__addBlock">
        <IconButton style={addTaskButton} aria-label="add task">
          <AddIcon style={{ color: '#a2a0a2' }} />
          Добавить секцию
        </IconButton>
      </div>
    </main>
  );
};

export default Board;
