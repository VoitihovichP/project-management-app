import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import './App.scss';
import Welcome from './pages/Welcome/Welcome';

const App: FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
      <Footer />
    </div>
  );
}; //заменить роут на welcome

export default App;
