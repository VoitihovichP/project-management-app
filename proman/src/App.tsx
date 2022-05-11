import React, { FC } from 'react';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Welcome from './pages/Welcome/Welcome';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import { Route, Routes } from 'react-router-dom';
import './App.scss';

const App: FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
