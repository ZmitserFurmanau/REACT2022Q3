import React, { FC, useState, useEffect, useContext } from 'react';

import SearchForm from '../../components/SearchForm';
import CardList from '../../components/CardList';
import { getData } from '../../services/GuardianService';
import Loader from '../Loader';
import CardItemModal from '../CardItemModal';
import { ModalData } from '../../types/types';
import { AppContext } from '../../context/AppContext';
import { SearchActionTypes } from '../../types/search';
import styles from './SearchMain.module.scss';

const SearchMain: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { query, dataArr } = state.search;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getData(query).catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
      data &&
        isMounted &&
        dispatch({ type: SearchActionTypes.SET_DATA, payload: data.response.results });
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [query, dispatch]);

  useEffect(() => {
    if (dataArr.length) {
      setIsLoading(false);
    }
  }, [dataArr]);

  const updateQuery = (query: string) => {
    dispatch({ type: SearchActionTypes.SET_QUERY, payload: query });
  };

  const toggleModal = (newModalData?: ModalData | undefined) => {
    setIsModalActive((isModalActive) => !isModalActive);
    !newModalData && setModalData(null);
    newModalData && setModalData({ ...newModalData });
  };

  const generateModal = () => {
    if (!modalData) return null;
    const { body, thumbnail, standfirst, webPublicationDate, shortUrl } = modalData;
    return (
      <CardItemModal
        body={body}
        thumbnail={thumbnail}
        standfirst={standfirst}
        webPublicationDate={webPublicationDate}
        shortUrl={shortUrl}
      />
    );
  };

  const generateCards = () => {
    if (isError) {
      return <h1 className="errorMsg">Something went wrong... Check your internet connection.</h1>;
    }
    return isLoading ? <Loader /> : <CardList dataArr={dataArr} toggleModal={toggleModal} />;
  };

  return (
    <div data-testid="home">
      <div className={styles.formWrapper}>
        <SearchForm setQuery={updateQuery} query={query} />
      </div>
      {generateCards()}
      <div
        className={`${styles.modalWrapper} ${isModalActive ? styles.isActive : ''}`}
        onClick={() => toggleModal()}
      >
        {generateModal()}
      </div>
    </div>
  );
};

export default SearchMain;
