import React, { Component } from 'react';

import { FormRef } from '../../utils/types';
import { FormProps } from './types';
import { fileReader } from '../../utils/fileReader';
import styles from './FormCard.module.scss';

export default class FormCard extends Component<FormProps, Record<string, never>> {
  formRef: FormRef;

  constructor(props: FormProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.formRef = {
      name: React.createRef(),
      date: React.createRef(),
      delivery: React.createRef(),
      time: React.createRef(),
      image: React.createRef(),
      agree: React.createRef(),
    };
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
    this.props.setFormState({ name, date, delivery, time, image, agree });
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          <span className={styles.text}>Name:</span>
          <input className={styles.input} type="text" name="name" ref={this.formRef.name} />
        </label>
        <label className={styles.label}>
          <span className={styles.text}>Delivery date:</span>
          <input className={styles.input} type="date" name="birthdate" ref={this.formRef.date} />
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
          <input type="file" name="image" ref={this.formRef.image} />
        </label>
        <div className={styles.agree}>
          <input type="checkbox" name="agree" id="agree" ref={this.formRef.agree} />
          <label htmlFor="agree">I agree to the processing of personal data</label>
        </div>
        <button type="submit" className={styles.button}>
          Make the order
        </button>
      </form>
    );
  }
}
