import React, { FC } from 'react';
import { Button } from '@mui/material';

import './confirmationModal.scss';

import { injectIntl, FormattedMessage, useIntl, WrappedComponentProps } from 'react-intl';

type ConfirmModalProps = {
  cancelDelete: () => void;
  deleteBoard: () => void;
};

const ConfirmationModal: FC<ConfirmModalProps> = ({ cancelDelete, deleteBoard }) => {
  return (
    <div className="owerlay">
      <div className="confirm-modal">
        <p className="confirm-modal__warning">
          {useIntl().formatMessage({ id: 'DELETE_TASK_MODAL' })}
        </p>
        <div className="confirm-modal__buttons">
          <Button
            type="submit"
            variant="outlined"
            className="main-page__create"
            onClick={() => cancelDelete()}
          >
            {useIntl().formatMessage({ id: 'DELETE_TASK_MODAL_OPTION1' })}
          </Button>
          <Button
            type="submit"
            variant="outlined"
            className="main-page__create"
            onClick={() => deleteBoard()}
          >
            {useIntl().formatMessage({ id: 'DELETE_TASK_MODAL_OPTION2' })}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
