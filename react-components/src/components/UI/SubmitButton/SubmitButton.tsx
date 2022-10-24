import React, { FC } from 'react';

import { SubmitButtonProps } from './types';
import styles from './SubmitButton.module.scss';

const SubmitButton: FC<SubmitButtonProps> = ({ isButtonDisabled, errorsArr }) => {
  return (
    <button
      type="submit"
      className={styles.button}
      disabled={isButtonDisabled || errorsArr.length > 0}
      data-testid="submit-button"
    >
      Make your order
    </button>
  );
};

export default SubmitButton;
