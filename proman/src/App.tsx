import React, { FC } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Welcome from './pages/Welcome/Welcome';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import Boards from './pages/Boards/Boards';
import Error from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/Main/MainPage';

const App: FC = () => {
  return (
    <body>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </body>
  );
};

export default App;
