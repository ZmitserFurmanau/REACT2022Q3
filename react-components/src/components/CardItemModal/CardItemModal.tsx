import React, { FC } from 'react';

import { CardItemModalProps } from './types';
import { convertDate } from '../../utils/convertDate';
import styles from './CardItemModal.module.scss';

const CardItemModal: FC<CardItemModalProps> = ({
  body,
  thumbnail,
  standfirst,
  webPublicationDate,
  shortUrl,
}) => {
  return (
    <div data-testid="card-item-modal">
      <div className={styles.closeWrapper}>
        <button className={styles.close} data-testid="close-modal-button"></button>
      </div>
      <div className={styles.inner} onClick={(e) => e.stopPropagation()} data-testid="modal-inner">
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
          <img src={thumbnail} className={styles.image} width="500" height="300" alt="" />
          <div dangerouslySetInnerHTML={{ __html: body }}></div>
        </div>
      </div>
    </div>
  );
};

export default CardItemModal;
