import React, { FC, useEffect, useState, useContext } from 'react';

import { SearchFormProps } from './types';
import { AppContext } from '../../context/AppContext';
import styles from './SearchForm.module.scss';

const SearchForm: FC<SearchFormProps> = ({ setQuery }) => {
  const [formValue, setFormValue] = useState<string>('');

  const { state } = useContext(AppContext);
  const { query } = state.search;

  const nameInput = 'search';
  const typeInput = 'text';
  const placeholderInput = 'Search...';

  useEffect(() => {
    const prevValue = localStorage.getItem('zmitserfurmanau-search-query') || '';
    setQuery(prevValue);
    setFormValue(prevValue);
  }, [setQuery]);

  useEffect(() => {
    if (query) {
      setFormValue(query);
    }
  }, [query]);

  const updateFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target && setFormValue(target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(formValue);
    localStorage.setItem('zmitserfurmanau-search-query', formValue);
  };

  return (
    <form className={styles.form} onSubmit={(e: React.FormEvent) => onSubmit(e)}>
      <input
        className={styles.input}
        name={nameInput}
        type={typeInput}
        placeholder={placeholderInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormValue(e)}
        value={formValue}
        autoFocus={true}
      />
      <button type="submit" className={styles.button}>
        Find
      </button>
    </form>
  );
};

export default SearchForm;
