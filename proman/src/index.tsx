import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <CookiesProvider>
        <HashRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </HashRouter>
      </CookiesProvider>
    </DndProvider>
  </React.StrictMode>
);
