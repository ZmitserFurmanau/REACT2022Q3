import React, { Component } from 'react';

import { FormRef, FormData, ErrorTypes, FormFieldTypes } from '../../utils/types';
import { FormProps, FormState } from './types';
import { fileReader } from '../../utils/fileReader';
import RequiredMessage from '../Validation/RequiredMessage';
import AgreeMessage from '../Validation/AgreeMessage';
import ShortMessage from '../Validation/ShortMessage';
import InvalidMessage from '../Validation/InvalidMessage';
import InvalidDateMessage from '../Validation/InvalidDateMessage';
import Modal from '../Modal';
import styles from './FormCard.module.scss';

export default class FormCard extends Component<FormProps, FormState> {
  formRef: FormRef;

  constructor(props: FormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModalActive = this.toggleModalActive.bind(this);
    this.state = {
      errorsArr: [],
      isButtonDisabled: true,
      isModalActive: false,
    };
    this.formRef = {
      common: React.createRef(),
      name: React.createRef(),
      date: React.createRef(),
      delivery: React.createRef(),
      time: React.createRef(),
      image: React.createRef(),
      agree: React.createRef(),
    };
  }

  validate(fields: FormData) {
    this.setState({ errorsArr: [] });
    const keys = Object.keys(fields);
    keys.forEach((el: string) => {
      if (!fields[el as keyof typeof fields]) {
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

  hideValidationErr(e: React.ChangeEvent) {
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
    const time = timeRef.current?.checked ? 'eveningtime' : 'daytime';
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
    return (
      <div>
        <form className={styles.form} ref={this.formRef.common} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            <span className={styles.text}>Name:</span>
            <input
              className={styles.input}
              type="text"
              name={FormFieldTypes.NAME}
              ref={this.formRef.name}
              onChange={(e) => this.hideValidationErr(e)}
            />
            {this.state.errorsArr.includes(ErrorTypes.NAME_REQUIRED) && <RequiredMessage />}
            {this.state.errorsArr.includes(ErrorTypes.NAME_SHORT) && <ShortMessage />}
            {this.state.errorsArr.includes(ErrorTypes.NAME_INVALID) && <InvalidMessage />}
          </label>
          <label className={styles.label}>
            <span className={styles.text}>Date of delivery:</span>
            <input
              className={styles.input}
              type="date"
              name={FormFieldTypes.DATE}
              ref={this.formRef.date}
              onChange={(e) => this.hideValidationErr(e)}
            />
            {this.state.errorsArr.includes(ErrorTypes.DATE_REQUIRED) && <RequiredMessage />}
            {this.state.errorsArr.includes(ErrorTypes.DATE_INVALID) && <InvalidDateMessage />}
          </label>
          <label className={styles.label}>
            <span className={styles.text}>Type of delivery:</span>
            <select
              name={FormFieldTypes.DELIVERY}
              ref={this.formRef.delivery}
              className={styles.select}
              onChange={(e) => this.hideValidationErr(e)}
              defaultValue={'default'}
            >
              <option disabled value="default">
                Select delivery type
              </option>
              <option>delivery to the door</option>
              <option>delivery to the postamate</option>
              <option>pickup</option>
            </select>
            {this.state.errorsArr.includes(ErrorTypes.DELIVERY_REQUIRED) && <RequiredMessage />}
          </label>
          <label className={styles.label}>
            <span className={styles.text}>Time of delivery:</span>
            <div className={styles.slide}>
              <label className="label-checkbox" htmlFor="checkbox-call">
                daytime
              </label>
              <input
                className="slide-checkbox"
                type="checkbox"
                name={FormFieldTypes.TIME}
                id="checkbox-call"
                ref={this.formRef.time}
              />
              <label className="custom-checkbox" htmlFor="checkbox-call"></label>
              <label className="label-checkbox" htmlFor="checkbox-call">
                eveningtime
              </label>
            </div>
          </label>
          <label className={styles.label}>
            <span className={styles.text}>
              Additional information <br /> (photo):
            </span>
            <input
              type="file"
              name={FormFieldTypes.IMAGE}
              ref={this.formRef.image}
              onChange={(e) => this.hideValidationErr(e)}
            />
            {this.state.errorsArr.includes(ErrorTypes.IMAGE_REQUIRED) && <RequiredMessage />}
          </label>
          <div className={styles.agree}>
            <input
              type="checkbox"
              name={FormFieldTypes.AGREE}
              id="agree"
              ref={this.formRef.agree}
              onChange={(e) => this.hideValidationErr(e)}
            />
            <label htmlFor="agree">I agree to the processing of personal data</label>
            {this.state.errorsArr.includes(ErrorTypes.AGREE_REQUIRED) && <AgreeMessage />}
          </div>
          <button
            type="submit"
            className={styles.button}
            disabled={this.state.isButtonDisabled || this.state.errorsArr.length > 0}
          >
            Make the order
          </button>
        </form>
        <Modal isActive={this.state.isModalActive} toggleModalActive={this.toggleModalActive} />
      </div>
    );
  }
}
