import React, { FC } from 'react';
import './error.scss';

const Error: FC = () => {
  return (
    <main className="error-page">
      <h2 className="error-page_title">404</h2>
      <h3 className="error-page_description__1">Страница не найдена</h3>
      <h4 className="error-page_description__2">Что-то пошло не так...</h4>
    </main>
  );
};

export default Error;
