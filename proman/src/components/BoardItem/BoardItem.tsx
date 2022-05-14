import React, { FC } from 'react';
import './boardItem.scss';

type BoardItemProps = {
  title: string;
};

const BoardItem: FC<BoardItemProps> = ({ title }) => {
  return (
    <div className="board-item">
      <h3 className="board-item__title">{title}</h3>
    </div>
  );
};

export default BoardItem;
