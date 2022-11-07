import React, { useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { ErrorMessages, FormDataValues } from '../../../types/types';
import ErrorMessage from '../../FormErrorMessage';
import { useAppDispatch } from '../../../hooks/redux';
import { setDate } from '../../../store/reducers/formSlice';
import styles from './DateInput.module.scss';

const DateInput = (props: UseControllerProps<FormDataValues, 'date'>) => {
  const { field, formState } = useController(props);
  const { value } = field;
  const { errors } = formState;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDate(value));
  }, [dispatch, value]);

  return (
    <label className="label">
      <span className="label-text">Delivery date:</span>
      <input className={styles.input} type="date" data-testid="date-input" {...field} />
      {errors.date && errors.date.type === 'required' && (
        <ErrorMessage text={ErrorMessages.DATE_REQUIRED} />
      )}
      {errors.date && errors.date.type === 'validate' && (
        <ErrorMessage text={ErrorMessages.DATE_INVALID} />
      )}
    </label>
  );
};

export default DateInput;
