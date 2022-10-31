import React, { FC, useEffect, useState, useContext } from 'react';

import { SearchFormProps } from './types';
import { AppContext } from '../../context/AppContext';
import styles from './SearchForm.module.scss';

const SearchForm: FC<SearchFormProps> = ({ setQuery, setSorting, setPage, setItemsPerPage }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { state } = useContext(AppContext);
  const { query, dataArr, sort, totalPages, currentPage, itemsPerPage } = state.search;

  const nameInput = 'search';
  const typeInput = 'text';
  const placeholderInput = 'Search...';

  useEffect(() => {
    if (!dataArr.length) {
      const prevValue = localStorage.getItem('zmitserfurmanau-search-query') || '';
      setQuery(prevValue);
      setSearchQuery(prevValue);
    }
  }, [dataArr, setQuery]);

  useEffect(() => {
    if (currentPage) {
      setPageNumber(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    target && setSearchQuery(target.value);
  };

  const updateSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(e.target.value);
  };
  const updatePage = (page: number) => {
    totalPages && setPage(Math.min(Math.max(page, 1), totalPages));
  };

  const updateItemsPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(+e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchQuery);
    localStorage.setItem('zmitserfurmanau-search-query', searchQuery);
  };

  return (
    <form className={styles.form} onSubmit={(e: React.FormEvent) => onSubmit(e)}>
      <input
        className={styles.input}
        name={nameInput}
        type={typeInput}
        placeholder={placeholderInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSearchQuery(e)}
        value={searchQuery}
        autoFocus={true}
      />
      <button type="submit" className={styles.button}>
        Find
      </button>
      <select className={styles.select} onChange={updateSorting} defaultValue={sort}>
        <option value="newest">sort by newest</option>
        <option value="oldest">sort by oldest</option>
        <option value="relevance">sort by relevance</option>
      </select>
      <label className={styles.label}>
        <span className={styles.labelText}>Items on page:</span>
        <select className={styles.items} onChange={updateItemsPerPage} defaultValue={itemsPerPage}>
          <option>10</option>
          <option>15</option>
          <option>20</option>
        </select>
      </label>
      <label className={styles.label}>
        <span className={styles.labelText}>Page number:</span>
        <div>
          <input
            className={styles.page}
            type="number"
            value={pageNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPageNumber(+e.target.value)}
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => updatePage(+e.target.value)}
            min="1"
            max={totalPages ? String(totalPages) : '1'}
          />
          <span className={styles.labelText}> / {totalPages}</span>
        </div>
      </label>
    </form>
  );
};

export default SearchForm;
