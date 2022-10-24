import React, { FC } from 'react';

import { DateInputProps } from './types';
import { ErrorTypes, FormFieldTypes, ErrorMessages } from '../../../utils/types';
import ErrorMessage from '../../FormErrorMessage';
import styles from './DateInput.module.scss';

const DateInput: FC<DateInputProps> = ({ forwardRef, errorsArr, errReset }) => {
  return (
    <label className="label">
      <span className="label-text">Delivery date:</span>
      <input
        className={styles.input}
        type="date"
        name={FormFieldTypes.DATE}
        ref={forwardRef}
        onChange={(e) => errReset(e)}
        data-testid="date-input"
      />
      {errorsArr.includes(ErrorTypes.DATE_REQUIRED) && (
        <ErrorMessage text={ErrorMessages.DATE_REQUIRED} />
      )}
      {errorsArr.includes(ErrorTypes.DATE_INVALID) && (
        <ErrorMessage text={ErrorMessages.DATE_INVALID} />
      )}
    </label>
  );
};

export default DateInput;
