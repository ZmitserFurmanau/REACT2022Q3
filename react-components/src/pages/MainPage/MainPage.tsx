import React, { Component } from 'react';
import { MainPageState } from './types';
import Header from '../../components/Header';

import styles from './MainPage.module.scss';
import SearchForm from 'components/SearchForm';

export default class MainPage extends Component {
  // constructor() {
  //   super(null);
  //   // this.state = {};
  // }

  render() {
    return (
      <div>
        <div className={styles.formWrapper}>
          <SearchForm />
        </div>
      </div>
    );
  }
}
