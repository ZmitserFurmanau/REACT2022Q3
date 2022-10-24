import React, { FC } from 'react';

import { AgreeCheckboxProps } from './types';
import { ErrorTypes, FormFieldTypes, ErrorMessages } from '../../../utils/types';
import ErrorMessage from '../../FormErrorMessage';
import styles from './AgreeCheckbox.module.scss';

const AgreeCheckbox: FC<AgreeCheckboxProps> = ({ forwardRef, errorsArr, errReset }) => {
  return (
    <div className={styles.agree}>
      <input
        type="checkbox"
        name={FormFieldTypes.AGREE}
        id="agree"
        ref={forwardRef}
        onChange={(e) => errReset(e)}
        data-testid="agree-checkbox"
      />
      <label htmlFor="agree">I agree to the processing of personal data</label>
      {errorsArr.includes(ErrorTypes.AGREE_REQUIRED) && (
        <ErrorMessage text={ErrorMessages.AGREE_REQUIRED} />
      )}
    </div>
  );
};

export default AgreeCheckbox;
