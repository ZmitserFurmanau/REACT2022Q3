import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { HeaderState } from './types';
import styles from './Header.module.scss';

export default class Header extends Component {
  // constructor() {
  //   super(null);
  //   // this.state = {};
  // }

  render() {
    return (
      <div className={styles.wrapper}>
        <NavLink to="/" className={styles.link}>
          Main
        </NavLink>
        <NavLink to="/about" className={styles.link}>
          About Us
        </NavLink>
      </div>
    );
  }
}
