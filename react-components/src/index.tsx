import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import NotFindPage from './pages/NotFindPage';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFindPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
