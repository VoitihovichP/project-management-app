import React, { FC } from 'react';
import { Button } from '@mui/material';

import './confirmationModal.scss';

type ConfirmModalProps = {
  cancelDelete: () => void;
  deleteBoard: () => void;
};

const ConfirmationModal: FC<ConfirmModalProps> = ({ cancelDelete, deleteBoard }) => {
  return (
    <div className="owerlay">
      <div className="confirm-modal">
        <p className="confirm-modal__warning">
          Вы точно хотите удалить этот элемент? Это действие невозможно отменить!
        </p>
        <div className="confirm-modal__buttons">
          <Button
            type="submit"
            variant="outlined"
            className="main-page__create"
            onClick={() => cancelDelete()}
          >
            Нет
          </Button>
          <Button
            type="submit"
            variant="outlined"
            className="main-page__create"
            onClick={() => deleteBoard()}
          >
            Да
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
