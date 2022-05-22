import React, { FC } from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Welcome from './pages/Welcome/Welcome';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import Board from './pages/Board/Board';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import './App.scss';

const App: FC = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
