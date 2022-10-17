import React, { Component } from 'react';

import { SearchMainState } from './types';
import SearchForm from '../../components/SearchForm';
import CardList from '../../components/CardList';
import GuardianService from '../../services/GuardianService';
import styles from './SearchMain.module.scss';

export default class SearchMain extends Component<Record<string, never>, SearchMainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      query: '',
    };
    this.setQuery = this.setQuery.bind(this);
  }

  async componentDidUpdate({}, prevState: SearchMainState) {
    if (prevState.query !== this.state.query) {
      const data = await GuardianService.getData(this.state.query);
      console.log(data);
    }
  }

  setQuery(query: string) {
    this.setState({ query: query });
  }

  render() {
    return (
      <div data-testid="home">
        <div className={styles.formWrapper}>
          <SearchForm setQuery={this.setQuery} />
        </div>
        <CardList />
      </div>
    );
  }
}
