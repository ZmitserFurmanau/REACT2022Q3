import React, { Component } from 'react';

import { SearchFormState } from './types';
import styles from './SearchForm.module.scss';

export default class SearchForm extends Component<Record<string, never>, SearchFormState> {
  state: SearchFormState = {
    value: '',
  };

  private readonly nameImput = 'search';
  private readonly typeImput = 'text';
  private readonly placeholderImput = 'Search...';

  componentDidMount() {
    this.setState({ value: localStorage.getItem('zmitserfurmanau-search-query') || '' });
  }

  componentWillUnmount() {
    localStorage.setItem('zmitserfurmanau-search-query', this.state.value);
  }

  handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    target && this.setState({ value: target.value });
  }

  render() {
    return (
      <form action="" className={styles.form}>
        <input
          name={this.nameImput}
          type={this.typeImput}
          className={styles.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleSearch(e)}
          value={this.state.value}
          placeholder={this.placeholderImput}
          autoFocus={true}
        />
      </form>
    );
  }
}
