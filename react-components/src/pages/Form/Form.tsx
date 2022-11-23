import React, { FC, useState } from 'react';

import FormCard from '../../components/FormCard';
import { FormData } from '../../utils/types';
import FormCardList from '../../components/FormCardList';
import styles from './Form.module.scss';

const Form: FC = () => {
  const [formStatesArr, setFormStatesArr] = useState<FormData[] | []>([]);

  const setFormState = (newState: FormData) => {
    setFormStatesArr([newState, ...formStatesArr]);
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
