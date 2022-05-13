import React, { FC } from 'react';
import './closeFormBtn.scss';

type CloseFormBtnProps = {
  closeFormFunc: () => void;
};

const CloseFormBtn: FC<CloseFormBtnProps> = ({ closeFormFunc }) => {
  return <div className="close-btn" onClick={() => closeFormFunc()}></div>;
};

export default CloseFormBtn;
