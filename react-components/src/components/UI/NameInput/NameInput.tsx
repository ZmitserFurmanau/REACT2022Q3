import React, { FC } from 'react';

import { NameInputProps } from './types';
import { ErrorTypes, FormFieldTypes, ErrorMessages } from '../../../utils/types';
import ErrorMessage from '../../FormErrorMessage';
import styles from './NameInput.module.scss';

const NameInput: FC<NameInputProps> = ({ forwardRef, errorsArr, errReset }) => {
  return (
    <label className="label">
      <span className="label-text">Name:</span>
      <input
        className={styles.input}
        type="text"
        name={FormFieldTypes.NAME}
        ref={forwardRef}
        onChange={(e) => errReset(e)}
      />
      {errorsArr.includes(ErrorTypes.NAME_REQUIRED) && (
        <ErrorMessage text={ErrorMessages.NAME_REQUIRED} />
      )}
      {errorsArr.includes(ErrorTypes.NAME_SHORT) && (
        <ErrorMessage text={ErrorMessages.NAME_SHORT} />
      )}
      {errorsArr.includes(ErrorTypes.NAME_INVALID) && (
        <ErrorMessage text={ErrorMessages.NAME_INVALID} />
      )}
    </label>
  );
};

export default NameInput;
