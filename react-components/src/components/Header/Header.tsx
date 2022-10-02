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
      <div>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/about">О нас</NavLink>
      </div>
    );
  }
}
