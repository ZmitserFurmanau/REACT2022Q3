import React, { Component } from 'react';

import { CardItemProps } from './types';
import styles from './CardItem.module.scss';

export default class CardItem extends Component<CardItemProps> {
  constructor(props: CardItemProps) {
    super(props);
  }

  render() {
    const { body, bylineHtml, headline, lastModified, shortUrl, standfirst, thumbnail } =
      this.props.data.fields;
    return (
      <li className={styles.wrapper}>
        <div className={styles.img}>
          <img src={thumbnail} className="img" width="500" height="300" alt="" />
        </div>
        <div className={styles.content}>
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
