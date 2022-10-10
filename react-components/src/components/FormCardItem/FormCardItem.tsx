import React, { Component } from 'react';

import { FormCardItemProps } from './types';
import styles from './FormCardItem.module.scss';

export default class FormCardItem extends Component<FormCardItemProps> {
  constructor(props: FormCardItemProps) {
    super(props);
  }

  render() {
    const { index, name, date, delivery, time, image, agree } = this.props;
    return (
      <li className={styles.wrapper}>
        <p className={styles.title}>{`Order # ${index}`}</p>
        <p className={styles.text}>{`Name: ${name}`}</p>
        <p className={styles.text}>{`Delivery date: ${date}`}</p>
        <p className={styles.text}>{`Type of delivery: ${delivery}`}</p>
        <p className={styles.text}>{`Delivery time: ${time}`}</p>
        <p className={styles.text}>
          {agree && '✔ yes, I agree to the processing of personal data'}
        </p>
        <p className={styles.text}>Additional information (photo):</p>
        <div className={styles.img}>
          <img src={image as string} alt="img" />
        </div>
      </li>
    );
  }
}
