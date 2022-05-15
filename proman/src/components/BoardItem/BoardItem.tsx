import React, { FC, useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { boardIdSlice } from '../../store/reducers/boardIdSlice';

import './boardItem.scss';

type BoardItemProps = {
  title: string;
  boardId: string;
  openConfirm: (id: string) => void;
  openEdit: () => void;
};

const menuListItem = [
  {
    id: 1,
    text: 'изменить',
  },
  {
    id: 2,
    text: 'удалить',
  },
];

const BoardItem: FC<BoardItemProps> = ({ title, boardId, openConfirm, openEdit }) => {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const select = useRef(null);

  const dispatch = useAppDispatch();
  const { changeBoardId } = boardIdSlice.actions;

  const handleOpenMenu = () => {
    setOpenMenu(!isOpenMenu);
    dispatch(changeBoardId(!isOpenMenu ? boardId : ''));
  };

  const openEditForm = () => {
    openEdit();
    setOpenMenu(false);
  };

  const openConfirmModal = () => {
    openConfirm(boardId);
    setOpenMenu(false);
  };

  const handleOutsideClick = (e: MouseEvent): void => {
    if (select.current && !e.composedPath().includes(select.current)) {
      setOpenMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="board-item">
      <h3 className="board-item__title">{title}</h3>
      <div className="board-item__menu">
        <button ref={select} className="board-item__menu-btn" onClick={() => handleOpenMenu()}>
          ...
        </button>
        {isOpenMenu && (
          <ul className="board-item__menu-list">
            {menuListItem.map(({ id, text }) => (
              <li
                key={id}
                className="board-item__menu-item"
                onClick={() => (id === menuListItem[0].id ? openEditForm() : openConfirmModal())}
              >
                {text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BoardItem;
