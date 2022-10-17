import React, { Component } from 'react';

import { CardItemProps, CardItemState } from './types';
import { convertDate } from '../../utils/convertDate';
import CardItemModal from '../CardItemModal';
import styles from './CardItem.module.scss';

export default class CardItem extends Component<CardItemProps, CardItemState> {
  constructor(props: CardItemProps) {
    super(props);
    this.state = {
      isModalActive: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ isModalActive: !this.state.isModalActive });
  }

  render() {
    const { body, headline, lastModified, shortUrl, standfirst, thumbnail } =
      this.props.data.fields;
    return (
      <React.Fragment>
        <li className={styles.wrapper} onClick={this.toggleModal}>
          <div className={styles.img}>
            <img src={thumbnail} className="img" width="500" height="300" alt="" />
          </div>
          <div className={styles.content}>
            <p className={styles.text}>{convertDate(lastModified)}</p>
            <p className={styles.title} dangerouslySetInnerHTML={{ __html: headline }}></p>
          </div>
          <div className={styles.btnWrapper}>
            <button type="button" className={styles.more}>
              Details <span className={styles.arrow}>➜</span>
            </button>
          </div>
        </li>
        <CardItemModal
          isActive={this.state.isModalActive}
          toggleActive={this.toggleModal}
          body={body}
          thumbnail={thumbnail}
          standfirst={standfirst}
          lastModified={lastModified}
          shortUrl={shortUrl}
        />
      </React.Fragment>
    );
  }
}
