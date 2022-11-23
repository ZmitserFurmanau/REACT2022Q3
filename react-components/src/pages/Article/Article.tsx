import React, { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { convertDate } from '../../utils/convertDate';
import { scrollToTop } from '../../utils/scrollToTop';
import { useAppSelector } from '../../hooks/redux';
import styles from './Article.module.scss';

const Article: FC = () => {
  const { articleData } = useAppSelector((state) => state.search);

  useEffect(() => {
    scrollToTop();
  }, []);

  if (!articleData) return <Navigate replace to="/" />;

  const { body, thumbnail, standfirst, webPublicationDate, shortUrl } = articleData;

  return (
    <div className="container" data-testid="article">
      <div className={styles.wrapper}>
        <header>
          <p dangerouslySetInnerHTML={{ __html: standfirst }} className={styles.standfirst}></p>
          <div className={styles.headerInner}>
            <p className={styles.date}>{convertDate(webPublicationDate)}</p>
            <a className={styles.link} href={shortUrl} target="_blank" rel="noreferrer">
              read on Guardian
            </a>
          </div>
        </header>
        <div className={styles.content}>
          <img
            src={thumbnail ? thumbnail : '/img/no-image.png'}
            className={styles.image}
            width="500"
            height="300"
            alt=""
          />
          <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
      </div>
    </div>
  );
};

export default Article;
