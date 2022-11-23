import React, { Component } from 'react';

import { SearchMainState } from './types';
import SearchForm from '../../components/SearchForm';
import CardList from '../../components/CardList';
import GuardianService from '../../services/GuardianService';
import Loader from '../Loader';
import CardItemModal from '../CardItemModal';
import { ModalData } from '../../utils/types';
import styles from './SearchMain.module.scss';

export default class SearchMain extends Component<Record<string, never>, SearchMainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      query: '',
      dataArr: [],
      isLoading: false,
      isError: false,
      isModalActive: false,
      modalData: null,
    };
    this.setQuery = this.setQuery.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  async componentDidUpdate({}, prevState: SearchMainState) {
    if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true });
      const data = await GuardianService.getData(this.state.query).catch(() => {
        this.setState({ isError: true });
      });
      data && this.setState({ dataArr: [...data.response.results] });
      this.setState({ isLoading: false });
    }
  }

  setQuery(query: string) {
    this.setState({ query: query });
  }
  toggleModal(newModalData?: ModalData | undefined) {
    this.setState({ isModalActive: !this.state.isModalActive });
    !newModalData && this.setState({ modalData: null });
    newModalData && this.setState({ modalData: { ...newModalData } });
  }

  generateModal() {
    const data = this.state.modalData;
    if (!data) return null;
    const { body, thumbnail, standfirst, webPublicationDate, shortUrl } = data;
    return (
      <CardItemModal
        body={body}
        thumbnail={thumbnail}
        standfirst={standfirst}
        webPublicationDate={webPublicationDate}
        shortUrl={shortUrl}
      />
    );
  }

  generateCards() {
    if (this.state.isError) {
      return <h1 className="errorMsg">Something went wrong... Check your internet connection.</h1>;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <CardList dataArr={this.state.dataArr} toggleModal={this.toggleModal} />
    );
  }

  render() {
    return (
      <div data-testid="home">
        <div className={styles.formWrapper}>
          <SearchForm setQuery={this.setQuery} />
        </div>
        {this.generateCards()}
        <div
          className={`${styles.modalWrapper} ${this.state.isModalActive ? styles.isActive : ''}`}
          onClick={() => this.toggleModal()}
        >
          {this.generateModal()}
        </div>
      </div>
    );
  }
}
