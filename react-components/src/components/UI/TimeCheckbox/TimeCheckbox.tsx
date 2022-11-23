import React, { useEffect, useContext } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { FormDataValues } from '../../../types/types';
import { AppContext } from '../../../context/AppContext';
import { FormActionTypes } from '../../../types/form';
import styles from './TimeCheckbox.module.scss';

const TimeCheckbox = (props: UseControllerProps<FormDataValues, 'time'>) => {
  const { field } = useController(props);
  const { value } = field;

  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: FormActionTypes.SET_TIME, payload: value });
  }, [dispatch, value]);

  return (
    <label className="label">
      <span className="label-text">Delivery time:</span>
      <div className={styles.slide}>
        <label className="label-checkbox" htmlFor="checkbox-call">
          day
        </label>
        <input className="slide-checkbox" type="checkbox" id="checkbox-call" {...field} />
        <label
          className="custom-checkbox"
          htmlFor="checkbox-call"
          data-testid="custom-checkbox"
        ></label>
        <label className="label-checkbox" htmlFor="checkbox-call">
          evening
        </label>
      </div>
    </label>
  );
};

export default TimeCheckbox;
