import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <NavLink to="/" className={styles.link} data-testid="home-link">
        Home
      </NavLink>
      <NavLink to="/form" className={styles.link} data-testid="form-link">
        Form
      </NavLink>
      <NavLink to="/about" className={styles.link} data-testid="about-link">
        About Us
      </NavLink>
    </div>
  );
};

export default Header;
