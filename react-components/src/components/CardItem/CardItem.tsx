import React, { FC, useContext } from 'react';

import { CardItemProps } from './types';
import { convertDate } from '../../utils/convertDate';
import { AppContext } from '../../context/AppContext';
import { SearchActionTypes } from '../../types/search';
import { Link } from 'react-router-dom';
import styles from './CardItem.module.scss';

const CardItem: FC<CardItemProps> = (props) => {
  const { body, headline, shortUrl, standfirst, thumbnail } = props.data.fields;
  const { webPublicationDate } = props.data;

  const { dispatch } = useContext(AppContext);

  const handleClick = () => {
    dispatch({
      type: SearchActionTypes.SET_ARTICLE_DATA,
      payload: { body, thumbnail, standfirst, webPublicationDate, shortUrl },
    });
  };
  return (
    <Link to="/article">
      <li className={styles.wrapper} onClick={handleClick}>
        <div className={styles.img}>
          <img
            src={thumbnail ? thumbnail : '/img/no-image.png'}
            className="img"
            width="500"
            height="300"
            alt=""
          />
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
    </Link>
  );
};

export default CardItem;
