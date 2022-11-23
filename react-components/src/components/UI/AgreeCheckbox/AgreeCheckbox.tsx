import React from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

import { ErrorMessages, FormDataValues } from '../../../utils/types';
import ErrorMessage from '../../FormErrorMessage';
import styles from './AgreeCheckbox.module.scss';

const AgreeCheckbox = (props: UseControllerProps<FormDataValues, 'agree'>) => {
  const { field, formState } = useController(props);
  const { errors } = formState;

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
