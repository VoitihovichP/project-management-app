import React, { FC } from 'react';
import './welcome.scss';
import Button from '@mui/material/Button';
import { WelcomePageText } from '../../types/enums';

const Welcome: FC = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-page__main-info">
        <div className="welcome-page__poster"></div>
        <div className="welcome-page__text">
          <h1 className="welcome-page__greeting">
            {WelcomePageText.GREETING_FIRST_PART} <span>{WelcomePageText.APP_TITLE}.</span>
          </h1>
          <p className="welcome-page__descr">{WelcomePageText.GREETING_SECOND_PART}</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
