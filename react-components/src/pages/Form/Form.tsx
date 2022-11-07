import React, { FC } from 'react';

import FormCard from '../../components/FormCard';
import { FormData } from '../../types/types';
import FormCardList from '../../components/FormCardList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setFormStatesArr } from '../../store/reducers/formSlice';
import styles from './Form.module.scss';

const Form: FC = () => {
  const dispatch = useAppDispatch();
  const { formStatesArr } = useAppSelector((state) => state.form);

  const setFormState = (newState: FormData) => {
    dispatch(setFormStatesArr([newState, ...formStatesArr]));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form} data-testid="form">
        <FormCard setFormState={setFormState} />
      </div>
      <h2>Your orders:</h2>
      {formStatesArr.length ? '' : <p>Data don&apos;t found</p>}
      <FormCardList statesArr={formStatesArr} />
    </div>
  );
};

export default Form;
