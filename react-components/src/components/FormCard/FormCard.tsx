import React, { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormDataValues, ErrorMessages } from '../../utils/types';
import { FormProps } from './types';
import { fileReader } from '../../utils/fileReader';
import NameInput from '../UI/NameInput';
import DateInput from '../UI/DateInput';
import DeliverySelect from '../UI/DeliverySelect';
import TimeCheckbox from '../UI/TimeCheckbox';
import AgreeCheckbox from '../UI/AgreeCheckbox';
import FormModal from '../FormModal';
import ErrorMessage from '../FormErrorMessage';
import styles from './FormCard.module.scss';

const FormCard: FC<FormProps> = ({ setFormState }) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
    register,
  } = useForm<FormDataValues>({
    defaultValues: {
      name: '',
      date: '',
      delivery: 'default',
      time: '',
      image: '',
      agree: '',
    },
    mode: 'onSubmit',
  });

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const toggleModalActive = () => {
    setIsModalActive((isModalActive) => !isModalActive);
  };

  const onSubmit = async (data: FormDataValues) => {
    const { name, date, delivery } = data;
    const time = data.time ? 'evening' : 'daytime';
    const agree = Boolean(data.agree);
    let image: string;
    if (data.image) {
      const blob = data.image[0].slice() as unknown as Blob;
      image = (await fileReader(blob)) as string;
      setFormState({ name, date, delivery, time, image, agree });
    }
    setIsModalActive(true);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="form-card">
        <NameInput
          control={control}
          name="name"
          rules={{ required: true, minLength: 3, pattern: /^[A-Za-z]+$/i }}
        />
        <DateInput
          control={control}
          name="date"
          rules={{
            required: true,
            validate: (value) => !(Date.parse(value) - Number(new Date()) < 0),
          }}
        />
        <DeliverySelect
          control={control}
          name="delivery"
          rules={{
            validate: (value) => value !== 'default',
          }}
        />
        <TimeCheckbox control={control} name="time" />
        <label className="label">
          <span className="label-text">
            Additional information <br /> (photo):
          </span>
          <input
            type="file"
            data-testid="file-input"
            {...register('image', {
              required: true,
            })}
          />
          {errors.image && <ErrorMessage text={ErrorMessages.IMAGE_REQUIRED} />}
        </label>
        <AgreeCheckbox
          control={control}
          name="agree"
          rules={{
            validate: (value) => value,
          }}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={!isDirty || Object.keys(errors).length !== 0}
          data-testid="submit-button"
        >
          Place the order
        </button>
      </form>
      <FormModal isActive={isModalActive} toggleModalActive={toggleModalActive} />
    </div>
  );
};

export default FormCard;
