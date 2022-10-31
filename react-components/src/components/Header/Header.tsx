import React, { FC } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isArticlePage = location.pathname.includes('article');

  const getTitle = (): string => {
    if (location.pathname === '/') return 'Home';
    if (location.pathname === '/about') return 'About us';
    const title = location.pathname.slice(1);
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.link} data-testid="home-link">
          Home
        </NavLink>
        <NavLink to="/form" className={styles.link} data-testid="form-link">
          Form
        </NavLink>
        <NavLink to="/about" className={styles.link} data-testid="about-link">
          About us
        </NavLink>
      </div>
      <div className={styles.title}>
        <h1>{getTitle()}</h1>
      </div>
      <div className={styles.buttonWrapper}>
        {isArticlePage && (
          <button className={styles.button} onClick={goBack}>
            go back
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
