import React, { Component } from 'react';

import { FormCardListProps } from './types';
import { FormData } from '../../utils/types';
import FormCardItem from '../FormCardItem';
import styles from './FormCardList.module.scss';

export default class FormCardList extends Component<FormCardListProps> {
  generateCards() {
    return this.props.statesArr.map((el: FormData, idx: number) => {
      return (
        <FormCardItem
          key={idx}
          index={this.props.statesArr.length - idx}
          name={el.name}
          date={el.date}
          delivery={el.delivery}
          time={el.time}
          image={el.image}
          agree={el.agree}
        />
      );
    }) as JSX.Element[];
  }

  render() {
    return (
      <ul className={styles.list} data-testid="form-card-list">
        {this.generateCards()}
      </ul>
    );
  }
}
