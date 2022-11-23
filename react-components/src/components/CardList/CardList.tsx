import React, { Component } from 'react';

import CardItem from '../CardItem';
import db from '../../assets/data/db.json';
import { CardData } from '../../utils/types';
import styles from './CardList.module.scss';

export default class CardList extends Component {
  generateCards() {
    return db.map((item: CardData) => {
      return (
        <CardItem
          key={item.id}
          id={item.id}
          title={item.title}
          ingredients={item.ingredients}
          price={item.price}
          weight={item.weight}
          ccal={item.ccal}
        />
      );
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
