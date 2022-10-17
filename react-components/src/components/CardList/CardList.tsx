import React, { Component } from 'react';

import CardItem from '../CardItem';
import { CardListProps } from './types';
import { GuardianResponseItem } from '../../utils/types';
import styles from './CardList.module.scss';

export default class CardList extends Component<CardListProps, Record<string, never>> {
  constructor(props: CardListProps) {
    super(props);
  }

  generateCards() {
    const { dataArr, toggleModal } = this.props;
    return dataArr.map((item: GuardianResponseItem) => {
      return <CardItem key={item.id} data={item} toggleModal={toggleModal} />;
    }) as JSX.Element[];
  }

  render() {
    return (
      <ul className={styles.list} data-testid="card-list">
        {this.generateCards()}
      </ul>
    );
  }
}
