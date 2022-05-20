import React, { FC } from 'react';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Welcome from './pages/Welcome/Welcome';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import Board from './pages/Board/Board';
import Error from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import './App.scss';

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
