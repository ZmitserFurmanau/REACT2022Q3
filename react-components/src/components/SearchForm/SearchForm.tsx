import React, { FC, useEffect, useState } from 'react';

import { SearchFormProps } from './types';
import styles from './SearchForm.module.scss';

const SearchForm: FC<SearchFormProps> = ({ setQuery }) => {
  const [formValue, setFormValue] = useState<string>('');

  const nameImput = 'search';
  const typeImput = 'text';
  const placeholderImput = 'Search...';

  useEffect(() => {
    const prevValue = localStorage.getItem('zmitserfurmanau-search-query') || '';
    setQuery(prevValue);
    setFormValue(prevValue);
  }, [setQuery]);

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
        name={nameImput}
        type={typeImput}
        placeholder={placeholderImput}
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
