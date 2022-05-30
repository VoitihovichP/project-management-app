import React, { FC, useState } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Welcome from './pages/Welcome/Welcome';
import { AuthorizationPage } from './pages/Authorization/AuthorizationPage';
import Board from './pages/Board/Board';
import Profile from './pages/Profile/Profile';
import Error from './pages/Error/Error';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import './App.scss';
import { useAppSelector } from './hooks/redux';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './i18n/locales';
import { messages } from './i18n/messages';

const App: FC = () => {
  const { isLogin } = useAppSelector((state) => state.userReducer);

  const getInitialLocale = () => {
    // получаем сохраненные данные
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || LOCALES.RUSSIAN;
  };

  const [currentLocale, setCurrentLocale] = useState(getInitialLocale());

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLocale(value);
    // сохраняем локацию в хранилище
    localStorage.setItem('locale', value);
  };

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={LOCALES.RUSSIAN}
      defaultLocale={LOCALES.RUSSIAN}
    >
      <div className="app-wrapper">
        <Header currentLocale={currentLocale} handleChange={handleChange} />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/authorization"
            element={isLogin ? <Navigate to="/main" /> : <AuthorizationPage />}
          />
          <Route path="/main" element={isLogin ? <MainPage /> : <Navigate to="/authorization" />} />
          <Route path="/board" element={isLogin ? <Board /> : <Navigate to="/authorization" />} />
          <Route
            path="/profile"
            element={isLogin ? <Profile /> : <Navigate to="/authorization" />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </div>
    </IntlProvider>
  );
};

export default App;
