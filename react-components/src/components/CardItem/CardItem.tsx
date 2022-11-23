import React, { FC } from 'react';

import { CardItemProps } from './types';
import { convertDate } from '../../utils/convertDate';
import styles from './CardItem.module.scss';

const CardItem: FC<CardItemProps> = (props) => {
  const { body, headline, shortUrl, standfirst, thumbnail } = props.data.fields;
  const { webPublicationDate } = props.data;
  const { toggleModal } = props;
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
};

export default CardItem;
