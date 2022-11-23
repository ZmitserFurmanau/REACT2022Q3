import React, { FC } from 'react';

import { FormCardListProps } from './types';
import { FormData } from '../../utils/types';
import FormCardItem from '../FormCardItem';
import styles from './FormCardList.module.scss';

const FormCardList: FC<FormCardListProps> = ({ statesArr }) => {
  const generateCards = () => {
    return statesArr.map((el: FormData, idx: number) => {
      return (
        <FormCardItem
          key={idx}
          index={statesArr.length - idx}
          name={el.name}
          date={el.date}
          delivery={el.delivery}
          time={el.time}
          image={el.image}
          agree={el.agree}
        />
      );
    }) as JSX.Element[];
  };

  return (
    <ul className={styles.list} data-testid="form-card-list">
      {generateCards()}
    </ul>
  );
};

export default FormCardList;
