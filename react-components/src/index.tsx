import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import { AppProvider } from './context/AppContext';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AppProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AppProvider>
);
