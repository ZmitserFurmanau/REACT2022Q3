import React, { FC, useState, useEffect, useContext, useCallback } from 'react';

import SearchForm from '../../components/SearchForm';
import CardList from '../../components/CardList';
import { getData } from '../../services/GuardianService';
import Loader from '../Loader';
import { AppContext } from '../../context/AppContext';
import { SearchActionTypes } from '../../types/search';
import styles from './SearchMain.module.scss';

const SearchMain: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { query, dataArr, sort, currentPage, itemsPerPage } = state.search;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getData(query, sort, currentPage, itemsPerPage).catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
      if (data && isMounted) {
        dispatch({ type: SearchActionTypes.SET_DATA, payload: data.response.results });
        dispatch({ type: SearchActionTypes.SET_TOTAL_PAGES, payload: data.response.pages });
      }
    };
    isSubmitting && fetchData();
    return () => {
      isMounted = false;
    };
  }, [query, dispatch, sort, isSubmitting, currentPage, itemsPerPage]);

  useEffect(() => {
    if (dataArr.length) {
      setIsLoading(false);
    }
  }, [dataArr]);

  const updateQuery = useCallback(
    (query: string) => {
      dispatch({ type: SearchActionTypes.SET_QUERY, payload: query });
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const updateSorting = useCallback(
    (sort: string) => {
      dispatch({ type: SearchActionTypes.SET_SORTING, payload: sort });
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const updatePage = useCallback(
    (page: number) => {
      dispatch({ type: SearchActionTypes.SET_CURRENT_PAGE, payload: page });
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const updateItemsPerPage = useCallback(
    (num: number) => {
      dispatch({ type: SearchActionTypes.SET_ITEMS_PER_PAGE, payload: num });
      setIsSubmitting(true);
    },
    [dispatch]
  );

  const generateCards = () => {
    if (isError) {
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
