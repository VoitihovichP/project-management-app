import React, { FC, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { columnSlice } from '../../store/asyncReducers/columnsSlice';
import { boardIdSlice } from '../../store/reducers/boardIdSlice';

import './boardItem.scss';

type BoardItemProps = {
  title: string;
  boardId: string;
  description: string;
  openConfirm: (id: string) => void;
  openEdit: (currTitle: string, currDescr: string) => void;
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

const BoardItem: FC<BoardItemProps> = ({ title, boardId, description, openConfirm, openEdit }) => {
  const navigate = useNavigate();
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);
  const select = useRef(null);
  const dispatch = useAppDispatch();
  const { changeBoardId } = boardIdSlice.actions;

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenMenu(!isOpenMenu);
    dispatch(changeBoardId(!isOpenMenu ? boardId : ''));
  };

  const openEditForm = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    openEdit(title, description);
    setOpenMenu(false);
  };

  const openConfirmModal = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.stopPropagation();
    openConfirm(boardId);
    setOpenMenu(false);
  };

  const handleOutsideClick = (e: MouseEvent): void => {
    if (select.current && !e.composedPath().includes(select.current)) {
      setOpenMenu(false);
    }
  };

  const handleClickBoardItem = () => {
    navigate('/board');
    localStorage.setItem('boardId', boardId);
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div onClick={handleClickBoardItem} className="board-item">
      <div className="board-item__text">
        <h3 className="board-item__title">{title}</h3>
        <p className="board-item__descr">{description}</p>
      </div>
      <div className="board-item__menu">
        <button ref={select} className="board-item__menu-btn" onClick={(e) => handleOpenMenu(e)}>
          ...
        </button>
        {isOpenMenu && (
          <ul className="board-item__menu-list" onClick={(e) => e.stopPropagation()}>
            {menuListItem.map(({ id, text }) => (
              <li
                key={id}
                className="board-item__menu-item"
                onClick={(e) => (id === menuListItem[0].id ? openEditForm(e) : openConfirmModal(e))}
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
