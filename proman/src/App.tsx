import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import Welcome from './pages/Welcome/Welocme';
import './App.scss';

const App: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
      </Routes>
    </div>
  );
}; //заменить роут на welcome

export default App;
