import React, { Component } from 'react';

import { DateInputProps } from './types';
import { ErrorTypes, FormFieldTypes } from '../../../utils/types';
import RequiredMessage from '../../Validation/RequiredMessage';
import InvalidDateMessage from '../../Validation/InvalidDateMessage';
import styles from './DateInput.module.scss';

export default class DateInput extends Component<DateInputProps, Record<string, never>> {
  render() {
    const { forwardRef, errorsArr, errReset } = this.props;
    return (
      <label className="label">
        <span className="label-text">Delivery date:</span>
        <input
          className={styles.input}
          type="date"
          name={FormFieldTypes.DATE}
          ref={forwardRef}
          onChange={(e) => errReset(e)}
        />
        {errorsArr.includes(ErrorTypes.DATE_REQUIRED) && <RequiredMessage />}
        {errorsArr.includes(ErrorTypes.DATE_INVALID) && <InvalidDateMessage />}
      </label>
    );
  }
}
