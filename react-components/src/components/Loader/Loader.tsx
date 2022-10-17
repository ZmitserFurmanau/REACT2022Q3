import React, { FC } from 'react';

import loader from '../../assets/icons/loader.svg';
import styles from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles.loader} data-testid="loader">
      <img src={loader} alt="" />
    </div>
  );
};

export default Loader;
