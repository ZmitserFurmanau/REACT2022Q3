import React, { FC, useState, useEffect, useCallback } from 'react';

import SearchForm from '../../components/SearchForm';
import CardList from '../../components/CardList';
import Loader from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  getData,
  setCurrentPage,
  setItemsPerPage,
  setQuery,
  setSorting,
} from '../../store/reducers/searchSlice';
import styles from './SearchMain.module.scss';

const SearchMain: FC = () => {
  const dispatch = useAppDispatch();
  const { query, dataArr, sort, currentPage, itemsPerPage, isLoading, error } = useAppSelector(
    (state) => state.search
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    isSubmitting && isMounted && dispatch(getData({ query, sort, itemsPerPage, currentPage }));
    return () => {
      isMounted = false;
    };
  }, [query, dispatch, sort, isSubmitting, currentPage, itemsPerPage]);

  const updateQuery = useCallback(
    (query: string) => {
      dispatch(setQuery(query));
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const updateSorting = useCallback(
    (sort: string) => {
      dispatch(setSorting(sort));
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const updatePage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const updateItemsPerPage = useCallback(
    (num: number) => {
      dispatch(setItemsPerPage(num));
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const generateCards = () => {
    if (error) {
      return <h1 className="errorMsg">Something went wrong... Check your internet connection.</h1>;
    }
    return isLoading ? <Loader /> : <CardList dataArr={dataArr} />;
  };

  return (
    <div data-testid="home">
      <div className={styles.formWrapper}>
        <SearchForm
          setQuery={updateQuery}
          setSorting={updateSorting}
          setPage={updatePage}
          setItemsPerPage={updateItemsPerPage}
        />
      </div>
      {generateCards()}
    </div>
  );
};

export default SearchMain;
