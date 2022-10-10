import React, { Component } from 'react';

import { TimeCheckboxProps } from './types';
import { FormFieldTypes } from '../../../utils/types';
import styles from './TimeCheckbox.module.scss';

export default class TimeCheckbox extends Component<TimeCheckboxProps, Record<string, never>> {
  render() {
    const { forwardRef } = this.props;
    return (
      <label className="label">
        <span className="label-text">Delivery time:</span>
        <div className={styles.slide}>
          <label className="label-checkbox" htmlFor="checkbox-call">
            day
          </label>
          <input
            className="slide-checkbox"
            type="checkbox"
            name={FormFieldTypes.TIME}
            id="checkbox-call"
            ref={forwardRef}
          />
          <label
            className="custom-checkbox"
            htmlFor="checkbox-call"
            data-testid="custom-checkbox"
          ></label>
          <label className="label-checkbox" htmlFor="checkbox-call">
            evening
          </label>
        </div>
      </label>
    );
  }
}
