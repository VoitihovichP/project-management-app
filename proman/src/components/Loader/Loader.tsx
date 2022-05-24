import React, { FC } from 'react';
import './loader.scss';

const Loader: FC = () => {
  return (
    <div className="loader">
      <span className="loader__content"></span>
    </div>
  );
};

export default Loader;
