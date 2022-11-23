import React, { FC } from 'react';

import CardItem from '../CardItem';
import { CardListProps } from './types';
import { GuardianResponseItem } from '../../types/types';
import styles from './CardList.module.scss';

const CardList: FC<CardListProps> = ({ dataArr }) => {
  const generateCards = () => {
    return dataArr.map((item: GuardianResponseItem) => {
      return <CardItem key={item.id} data={item} />;
    }) as JSX.Element[];
  };

  return (
    <ul className={styles.list} data-testid="card-list">
      {generateCards()}
    </ul>
  );
};

export default CardList;
