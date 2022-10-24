import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { ErrorMessages, FormDataValues } from '../../../utils/types';
import ErrorMessage from '../../FormErrorMessage';
import styles from './NameInput.module.scss';

const NameInput = (props: UseControllerProps<FormDataValues, 'name'>) => {
  const { field, formState } = useController(props);
  const { errors } = formState;
  return (
    <label className="label">
      <span className="label-text">Name:</span>
      <input className={styles.input} type="text" {...field} />
      {errors.name && errors.name.type === 'required' && (
        <ErrorMessage text={ErrorMessages.NAME_REQUIRED} />
      )}
      {errors.name && errors.name.type === 'minLength' && (
        <ErrorMessage text={ErrorMessages.NAME_SHORT} />
      )}
      {errors.name && errors.name.type === 'pattern' && (
        <ErrorMessage text={ErrorMessages.NAME_INVALID} />
      )}
    </label>
  );
};

export default NameInput;
