import React, { FC } from 'react';
import { TaskColumn } from '../../components/TaskColumn/taskColumn';
import './board.scss';

const Board: FC = () => {
  return (
    <main className="board-page">
      <TaskColumn />
    </main>
  );
};

export default Board;
