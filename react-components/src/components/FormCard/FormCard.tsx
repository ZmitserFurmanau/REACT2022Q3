import React, { Component } from 'react';

import { FormRef, FormData } from '../../utils/types';
import { FormProps, FormState } from './types';
import { fileReader } from '../../utils/fileReader';
import RequiredMessage from '../Validation/RequiredMessage';
import AgreeMessage from '../Validation/AgreeMessage';
import ShortMessage from '../Validation/ShortMessage';
import InvalidMessage from '../Validation/InvalidMessage';
import InvalidDateMessage from '../Validation/InvalidDateMessage';
import styles from './FormCard.module.scss';

export default class FormCard extends Component<FormProps, FormState> {
  formRef: FormRef;

  constructor(props: FormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      errorsArr: [],
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
      this.setState({ errorsArr: [...this.state.errorsArr, 'name:short'] });
    }
    if (fields.name.length && new RegExp(/[^a-zA-Z]+/g).test(fields.name)) {
      this.setState({ errorsArr: [...this.state.errorsArr, 'name:invalid'] });
    }
    if (fields.date && Date.parse(fields.date) - Number(new Date()) < 0) {
      this.setState({ errorsArr: [...this.state.errorsArr, 'date:invalid'] });
    }
  }

  hideValidationErr(e: React.ChangeEvent) {
    const currElem = e.target as HTMLInputElement;
    if (currElem.name === 'name') {
      this.setState({
        errorsArr: [
          ...this.state.errorsArr.filter(
            (el) => el !== 'name' && el !== 'name:short' && el !== 'name:invalid'
          ),
        ],
      });
    }
    if (currElem.name === 'date') {
      this.setState({
        errorsArr: [...this.state.errorsArr.filter((el) => el !== 'date' && el !== 'date:invalid')],
      });
    }
    if (currElem.name === 'image') {
      this.setState({
        errorsArr: [...this.state.errorsArr.filter((el) => el !== 'image')],
      });
    }
    if (currElem.name === 'agree') {
      this.setState({
        errorsArr: [...this.state.errorsArr.filter((el) => el !== 'agree')],
      });
    }
  }

  resetForm() {
    this.formRef.common.current?.reset();
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
    }
  }

  render() {
    return (
      <form className={styles.form} ref={this.formRef.common} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          <span className={styles.text}>Name:</span>
          <input
            className={styles.input}
            type="text"
            name="name"
            ref={this.formRef.name}
            onChange={(e) => this.hideValidationErr(e)}
          />
          {this.state.errorsArr.includes('name') && <RequiredMessage />}
          {this.state.errorsArr.includes('name:short') && <ShortMessage />}
          {this.state.errorsArr.includes('name:invalid') && <InvalidMessage />}
        </label>
        <label className={styles.label}>
          <span className={styles.text}>Delivery date:</span>
          <input
            className={styles.input}
            type="date"
            name="date"
            ref={this.formRef.date}
            onChange={(e) => this.hideValidationErr(e)}
          />
          {this.state.errorsArr.includes('date') && <RequiredMessage />}
          {this.state.errorsArr.includes('date:invalid') && <InvalidDateMessage />}
        </label>
        <label className={styles.label}>
          <span className={styles.text}>Type of delivery:</span>
          <select name="delivery" ref={this.formRef.delivery} className={styles.select}>
            <option>delivery to the door</option>
            <option>delivery to the postamate</option>
            <option>pickup</option>
          </select>
        </label>
        <label className={styles.label}>
          <span className={styles.text}>Delivery time:</span>
          <div className={styles.slide}>
            <label className="label-checkbox" htmlFor="checkbox-call">
              daytime
            </label>
            <input
              className="slide-checkbox"
              type="checkbox"
              name="time"
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
            name="image"
            ref={this.formRef.image}
            onChange={(e) => this.hideValidationErr(e)}
          />
          {this.state.errorsArr.includes('image') && <RequiredMessage />}
        </label>
        <div className={styles.agree}>
          <input
            type="checkbox"
            name="agree"
            id="agree"
            ref={this.formRef.agree}
            onChange={(e) => this.hideValidationErr(e)}
          />
          <label htmlFor="agree">I agree to the processing of personal data</label>
          {this.state.errorsArr.includes('agree') && <AgreeMessage />}
        </div>
        <button type="submit" className={styles.button}>
          Make the order
        </button>
      </form>
    );
  }
}
