import React, { Component } from 'react';

import CardList from '../../components/CardList';
import styles from './Home.module.scss';
import SearchForm from 'components/SearchForm';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.formWrapper}>
          <SearchForm />
        </div>
        <CardList />
      </div>
    );
  }
}
