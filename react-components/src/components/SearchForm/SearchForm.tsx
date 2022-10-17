import React, { Component } from 'react';

import { SearchFormProps, SearchFormState } from './types';
import styles from './SearchForm.module.scss';

export default class SearchForm extends Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      formValue: '',
    };
  }

  private readonly nameImput = 'search';
  private readonly typeImput = 'text';
  private readonly placeholderImput = 'Search...';

  componentDidMount() {
    this.setState({ formValue: localStorage.getItem('zmitserfurmanau-search-query') || '' });
  }

  setFormValue(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    target && this.setState({ formValue: target.value });
  }

  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.setQuery(this.state.formValue);
    localStorage.setItem('zmitserfurmanau-search-query', this.state.formValue);
  }

  render() {
    return (
      <form action="" className={styles.form} onSubmit={(e: React.FormEvent) => this.onSubmit(e)}>
        <input
          name={this.nameImput}
          type={this.typeImput}
          placeholder={this.placeholderImput}
          className={styles.input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setFormValue(e)}
          value={this.state.formValue}
          autoFocus={true}
        />
        <button type="submit" className={styles.button}>
          Find
        </button>
      </form>
    );
  }
}
