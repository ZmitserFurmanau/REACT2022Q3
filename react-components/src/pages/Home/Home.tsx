import React, { Component } from 'react';

import CardList from '../../components/CardList';
import SearchForm from '../../components/SearchForm';
import styles from './Home.module.scss';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.wrapper} data-testid="home">
          <SearchForm />
        </div>
        <CardList />
      </div>
    );
  }
}
