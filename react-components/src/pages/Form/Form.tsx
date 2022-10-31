import React, { FC, useContext } from 'react';

import FormCard from '../../components/FormCard';
import { FormData } from '../../types/types';
import FormCardList from '../../components/FormCardList';
import { AppContext } from '../../context/AppContext';
import { FormActionTypes } from '../../types/form';
import styles from './Form.module.scss';

const Form: FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { formStatesArr } = state.form;

  const setFormState = (newState: FormData) => {
    dispatch({
      type: FormActionTypes.SET_FORM_STATES_ARR,
      payload: [newState, ...state.form.formStatesArr],
    });
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
