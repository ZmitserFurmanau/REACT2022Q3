import React, { FC } from 'react';

import { FormCardItemProps } from './types';
import styles from './FormCardItem.module.scss';

const FormCardItem: FC<FormCardItemProps> = ({
  index,
  name,
  date,
  delivery,
  time,
  image,
  agree,
}) => {
  return (
    <li className={styles.wrapper}>
      <p className={styles.title}>{`Order # ${index}`}</p>
      <p className={styles.text}>{`Name: ${name}`}</p>
      <p className={styles.text}>{`Delivery date: ${date}`}</p>
      <p className={styles.text}>{`Type of delivery: ${delivery}`}</p>
      <p className={styles.text}>{`Delivery time: ${time}`}</p>
      <p className={styles.text}>{agree && '✔ yes, I agree to the processing of personal data'}</p>
      <p className={styles.text}>Additional information (photo):</p>
      <div className={styles.img}>
        <img src={image as string} alt="img" />
      </div>
    </li>
  );
};

export default FormCardItem;
