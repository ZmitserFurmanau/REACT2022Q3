import React, { Component } from 'react';
import { SearchFormState } from './types';

import styles from './SearchForm.module.scss';

export default class SearchForm extends Component<Record<string, never>, SearchFormState> {
  state: SearchFormState = {
    value: '',
  };

  private readonly newProperty = 'Search...';

  componentDidMount() {
    this.setState({ value: localStorage.getItem('zmitserfurmanau-search-query') || '' });
  }

  componentWillUnmount() {
    localStorage.setItem('zmitserfurmanau-search-query', this.state.value);
  }

  handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    if (target) {
      this.setState({ value: target.value });
    }
  }

  render() {
    return (
      <form action="" className={styles.form}>
        <input
          type="text"
          className={styles.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleSearch(e)}
          value={this.state.value}
          placeholder={this.newProperty}
          autoFocus={true}
        />
      </form>
    );
  }
}
