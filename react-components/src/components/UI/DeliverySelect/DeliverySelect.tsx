import React, { Component } from 'react';

import { DeliverySelectProps } from './types';
import { ErrorTypes, FormFieldTypes } from '../../../utils/types';
import RequiredMessage from '../../Validation/RequiredMessage';
import styles from './DeliverySelect.module.scss';

export default class DeliverySelect extends Component<DeliverySelectProps, Record<string, never>> {
  render() {
    const { forwardRef, errorsArr, errReset } = this.props;
    return (
      <label className="label">
        <span className="label-text">Type of delivery:</span>
        <select
          name={FormFieldTypes.DELIVERY}
          className={styles.select}
          ref={forwardRef}
          onChange={(e) => errReset(e)}
          defaultValue={'default'}
        >
          <option disabled value="default">
            Choose the type of delivery
          </option>
          <option>delivery to the door</option>
          <option>delivery to the postamate</option>
          <option>selfexport</option>
        </select>
        {errorsArr.includes(ErrorTypes.DELIVERY_REQUIRED) && <RequiredMessage />}
      </label>
    );
  }
}
