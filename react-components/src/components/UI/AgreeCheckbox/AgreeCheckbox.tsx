import React, { useEffect, useContext } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { ErrorMessages, FormDataValues } from '../../../types/types';
import ErrorMessage from '../../FormErrorMessage';
import { AppContext } from '../../../context/AppContext';
import { FormActionTypes } from '../../../types/form';
import styles from './AgreeCheckbox.module.scss';

const AgreeCheckbox = (props: UseControllerProps<FormDataValues, 'agree'>) => {
  const { field, formState } = useController(props);
  const { value } = field;
  const { errors } = formState;
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: FormActionTypes.SET_AGREE, payload: value });
  }, [dispatch, value]);

  return (
    <div className={styles.agree}>
      <input type="checkbox" id="agree" data-testid="agree-checkbox" {...field} />
      <label htmlFor="agree">I agree to the processing of personal data</label>
      {errors.agree && errors.agree.type === 'validate' && (
        <ErrorMessage text={ErrorMessages.AGREE_REQUIRED} />
      )}
    </div>
  );
};

export default AgreeCheckbox;
