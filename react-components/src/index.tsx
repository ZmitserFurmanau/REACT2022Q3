import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import PageNotFind from './pages/PageNotFind';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<PageNotFind />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
