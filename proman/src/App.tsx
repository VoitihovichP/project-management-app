import React, { FC } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Welcome from './pages/Welcome/Welcome';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import Board from './pages/Board/Board';
import Error from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './pages/Main/MainPage';

const App: FC = () => {
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
