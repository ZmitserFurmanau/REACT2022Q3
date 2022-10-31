import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import App from '../App';
import Home from '../pages/Home';
import About from '../pages/About';
import Article from '../pages/Article';
import Form from '../pages/Form';
import NotFound from '../pages/NotFound';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="article" element={<Article />} />
        <Route path="form" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
