import React, { Component, createRef } from 'react';

import { FormRef, FormData, ErrorTypes, FormFieldTypes } from '../../utils/types';
import { FormProps, FormState } from './types';
import { fileReader } from '../../utils/fileReader';
import NameInput from '../UI/NameInput';
import DateInput from '../UI/DateInput';
import DeliverySelect from '../UI/DeliverySelect';
import TimeCheckbox from '../UI/TimeCheckbox';
import FileInput from '../UI/FileInput';
import AgreeCheckbox from '../UI/AgreeCheckbox';
import SubmitButton from '../UI/SubmitButton/SubmitButton';
import Modal from '../Modal';
import styles from './FormCard.module.scss';

export default class FormCard extends Component<FormProps, FormState> {
  formRef: FormRef;

  constructor(props: FormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalActive = this.toggleModalActive.bind(this);
    this.errReset = this.errReset.bind(this);
    this.state = {
      errorsArr: [],
      isButtonDisabled: true,
      isModalActive: false,
    };
    this.formRef = {
      common: createRef(),
      name: createRef(),
      date: createRef(),
      delivery: createRef(),
      time: createRef(),
      image: createRef(),
      agree: createRef(),
    };
  }

  validate(fields: FormData) {
    this.setState({ errorsArr: [] });
    const keys = Object.keys(fields);
    keys.forEach((el: string) => {
      if (!fields[el as keyof typeof fields] || fields[el as keyof typeof fields] === '') {
        this.setState({ errorsArr: [...this.state.errorsArr, el] });
      }
    });
    if (
      fields.name.length &&
      !new RegExp(/[^a-zA-Z]+/g).test(fields.name) &&
      fields.name.length < 3
    ) {
      this.setState({ errorsArr: [...this.state.errorsArr, ErrorTypes.NAME_SHORT] });
    }
    if (fields.name.length && new RegExp(/[^a-zA-Z]+/g).test(fields.name)) {
      this.setState({ errorsArr: [...this.state.errorsArr, ErrorTypes.NAME_INVALID] });
    }
    if (fields.date && Date.parse(fields.date) - Number(new Date()) < 0) {
      this.setState({ errorsArr: [...this.state.errorsArr, ErrorTypes.DATE_INVALID] });
    }
    if (fields.delivery === 'default') {
      this.setState({ errorsArr: [...this.state.errorsArr, ErrorTypes.DELIVERY_REQUIRED] });
    }
  }

  errReset(e: React.ChangeEvent) {
    this.setState({ isButtonDisabled: false });
    const currElem = e.target as HTMLInputElement;
    switch (currElem.name) {
      case FormFieldTypes.NAME:
        this.setState({
          errorsArr: [
            ...this.state.errorsArr.filter(
              (el) =>
                el !== ErrorTypes.NAME_REQUIRED &&
                el !== ErrorTypes.NAME_SHORT &&
                el !== ErrorTypes.NAME_INVALID
            ),
          ],
        });
        break;
      case FormFieldTypes.DATE:
        this.setState({
          errorsArr: [
            ...this.state.errorsArr.filter(
              (el) => el !== ErrorTypes.DATE_REQUIRED && el !== ErrorTypes.DATE_INVALID
            ),
          ],
        });
        break;
      case FormFieldTypes.DELIVERY:
        this.setState({
          errorsArr: [...this.state.errorsArr.filter((el) => el !== ErrorTypes.DELIVERY_REQUIRED)],
        });
        break;
      case FormFieldTypes.IMAGE:
        this.setState({
          errorsArr: [...this.state.errorsArr.filter((el) => el !== ErrorTypes.IMAGE_REQUIRED)],
        });
        break;
      case FormFieldTypes.AGREE:
        this.setState({
          errorsArr: [...this.state.errorsArr.filter((el) => el !== ErrorTypes.AGREE_REQUIRED)],
        });
        break;
      default:
        break;
    }
  }

  resetForm() {
    this.formRef.common.current?.reset();
  }

  toggleModalActive() {
    this.setState({
      isModalActive: !this.state.isModalActive,
    });
  }

  async handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const {
      name: nameRef,
      date: dateRef,
      delivery: deliveryRef,
      time: timeRef,
      image: imageRef,
      agree: agreeRef,
    } = this.formRef;
    const name = nameRef.current?.value || '';
    const date = dateRef.current?.value || '';
    const delivery = deliveryRef.current?.value || '';
    const time = timeRef.current?.checked ? 'evening' : 'day';
    const agree = agreeRef.current?.checked || false;
    let image: string | null = null;
    if (imageRef.current?.files) {
      image = (await fileReader(imageRef.current?.files[0])) as string;
    }
    this.validate({ name, date, delivery, time, image, agree });
    if (!this.state.errorsArr.length) {
      this.props.setFormState({ name, date, delivery, time, image, agree });
      this.resetForm();
      this.setState({ isModalActive: true, isButtonDisabled: true });
    }
  }

  render() {
    const { errorsArr, isButtonDisabled } = this.state;
    const { name, date, delivery, time, image, agree } = this.formRef;
    return (
      <div>
        <form
          className={styles.form}
          ref={this.formRef.common}
          onSubmit={this.handleSubmit}
          data-testid="form-card"
        >
          <NameInput forwardRef={name} errorsArr={errorsArr} errReset={this.errReset} />
          <DateInput forwardRef={date} errorsArr={errorsArr} errReset={this.errReset} />
          <DeliverySelect forwardRef={delivery} errorsArr={errorsArr} errReset={this.errReset} />
          <TimeCheckbox forwardRef={time} />
          <FileInput forwardRef={image} errorsArr={errorsArr} errReset={this.errReset} />
          <AgreeCheckbox forwardRef={agree} errorsArr={errorsArr} errReset={this.errReset} />
          <SubmitButton isButtonDisabled={isButtonDisabled} errorsArr={errorsArr} />
        </form>
        <Modal isActive={this.state.isModalActive} toggleModalActive={this.toggleModalActive} />
      </div>
    );
  }
}
