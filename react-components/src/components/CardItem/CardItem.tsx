import React, { Component } from 'react';

import { CardItemProps } from './types';
import styles from './CardItem.module.scss';

export default class CardItem extends Component<CardItemProps> {
  constructor(props: CardItemProps) {
    super(props);
  }

  render() {
    const { id, title, ingredients, price, weight, ccal } = this.props;
    return (
      <li className={styles.wrapper}>
        <div className={styles.img}>
          <img src={`/img/cards/${id}.jpg`} alt="" />
        </div>
        <p className={styles.title}>{title}</p>
        <p className={styles.ingredients}>{ingredients}</p>
        <div className={styles.footer}>
          <div className={styles.left}>
            <span>{weight} grams </span>
            <span>{ccal} ccal </span>
          </div>
          <span className={styles.price}>{price} €</span>
        </div>
        <button type="button" className={styles.button}>
          Choose
        </button>
      </li>
    );
  }
}
