import React, { FC } from 'react';

import './boardItem.scss';

type BoardItemProps = {
  title: string;
  openConfirm: () => void;
};

const BoardItem: FC<BoardItemProps> = ({ title, openConfirm }) => {
  return (
    <div className="board-item">
      <h3 className="board-item__title">{title}</h3>
      <button className="board-item__delete" onClick={() => openConfirm()}>
        Удалить
      </button>
    </div>
  );
};

export default BoardItem;
