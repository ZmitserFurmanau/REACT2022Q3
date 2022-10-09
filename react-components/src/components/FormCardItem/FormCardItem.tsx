import React, { Component } from 'react';

import { FormCardItemProps } from './types';
import styles from './FormCardItem.module.scss';

export default class FormCardItem extends Component<FormCardItemProps> {
  constructor(props: FormCardItemProps) {
    super(props);
  }

  render() {
    const { name, date, postindex } = this.props;
    return (
      <li className={styles.wrapper}>
        {/* <div className={styles.img}>
          <img src={`/img/cards/${id}.jpg`} alt="" />
        </div> */}
        <p className={styles.title}>{name}</p>
        <p className={styles.date}>{date}</p>
        <p className={styles.postindex}>{postindex}</p>
      </li>
    );
  }
}
