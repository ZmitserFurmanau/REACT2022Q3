import React, { Component } from 'react';

import { FormCardListProps } from './types';
import { FormData } from '../../utils/types';
import styles from './FormCardList.module.scss';

export default class FormCardList extends Component<FormCardListProps> {
  generateCards() {
    return this.props.statesArr.map((el: FormData, idx: number) => {
      return <p key={idx}>{el.name}</p>;
    });
  }

  render() {
    return (
      <ul className={styles.list} data-testid="card-list">
        <ul className="list">{this.generateCards()}</ul>
      </ul>
    );
  }
}
