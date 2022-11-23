import React, { Component } from 'react';

import { CardItemProps } from './types';
import { convertDate } from '../../utils/convertDate';
import styles from './CardItem.module.scss';

export default class CardItem extends Component<CardItemProps, Record<string, never>> {
  constructor(props: CardItemProps) {
    super(props);
  }

  render() {
    const { body, headline, shortUrl, standfirst, thumbnail } = this.props.data.fields;
    const { webPublicationDate } = this.props.data;
    const { toggleModal } = this.props;
    return (
      <li
        className={styles.wrapper}
        onClick={() => toggleModal({ body, thumbnail, standfirst, webPublicationDate, shortUrl })}
      >
        <div className={styles.img}>
          <img src={thumbnail} className="img" width="500" height="300" alt="" />
        </div>
        <div className={styles.content}>
          <p className={styles.text}>{convertDate(webPublicationDate)}</p>
          <p className={styles.title} dangerouslySetInnerHTML={{ __html: headline }}></p>
        </div>
        <div className={styles.btnWrapper}>
          <button type="button" className={styles.more}>
            Details <span className={styles.arrow}>➜</span>
          </button>
        </div>
      </li>
    );
  }
}
