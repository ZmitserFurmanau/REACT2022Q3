import React, { FC } from 'react';

import styles from './Loader.module.scss';

const Loader: FC = () => {
  return (
    <div className={styles.preloader} data-testid="loader">
      <div className={styles.roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
