import React, { Component } from 'react';

import { NameInputProps } from './types';
import { ErrorTypes, FormFieldTypes } from '../../../utils/types';
import RequiredMessage from '../../Validation/RequiredMessage';
import ShortMessage from '../../Validation/ShortMessage';
import InvalidMessage from '../../Validation/InvalidMessage';
import styles from './NameInput.module.scss';

export default class NameInput extends Component<NameInputProps, Record<string, never>> {
  render() {
    const { forwardRef, errorsArr, errReset } = this.props;
    return (
      <label className="label">
        <span className="label-text">Name:</span>
        <input
          className={styles.input}
          type="text"
          name={FormFieldTypes.NAME}
          ref={forwardRef}
          onChange={(e) => errReset(e)}
        />
        {errorsArr.includes(ErrorTypes.NAME_REQUIRED) && <RequiredMessage />}
        {errorsArr.includes(ErrorTypes.NAME_SHORT) && <ShortMessage />}
        {errorsArr.includes(ErrorTypes.NAME_INVALID) && <InvalidMessage />}
      </label>
    );
  }
}
