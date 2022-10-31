import React, { useEffect, useContext } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { ErrorMessages, FormDataValues } from '../../../types/types';
import ErrorMessage from '../../FormErrorMessage';
import { AppContext } from '../../../context/AppContext';
import { FormActionTypes } from '../../../types/form';
import styles from './DeliverySelect.module.scss';

const DeliverySelect = (props: UseControllerProps<FormDataValues, 'delivery'>) => {
  const { field, formState } = useController(props);
  const { value } = field;
  const { errors } = formState;
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: FormActionTypes.SET_DELIVERY, payload: value });
  }, [dispatch, value]);

  return (
    <label className="label">
      <span className="label-text">Type of delivery:</span>
      <select className={styles.select} {...field}>
        <option disabled value="default">
          Choose the type of delivery
        </option>
        <option>delivery to the door</option>
        <option>delivery to the postamate</option>
        <option>selfexport</option>
      </select>
      {errors.delivery && errors.delivery.type === 'validate' && (
        <ErrorMessage text={ErrorMessages.DELIVERY_REQUIRED} />
      )}
    </label>
  );
};

export default DeliverySelect;
