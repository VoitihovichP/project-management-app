import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Welcome from './pages/Welcome/Welocme';

const App: FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
}; //заменить роут на welcome

export default App;
