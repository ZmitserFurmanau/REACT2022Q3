import React, { FC } from 'react';

import { FormModalProps } from './types';
import styles from './FormModal.module.scss';

const FormModal: FC<FormModalProps> = ({ isActive, toggleModalActive }) => {
  const generateModal = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p>Order successfully created!</p>
          <div className={styles.btnWrapper}>
            <button className={styles.button} onClick={toggleModalActive}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  };

  return isActive ? generateModal() : null;
};

export default FormModal;
