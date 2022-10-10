import React, { Component } from 'react';

import { AgreeCheckboxProps } from './types';
import { ErrorTypes, FormFieldTypes, ErrorMessages } from '../../../utils/types';
import ErrorMessage from '../../FormErrorMessage';
import styles from './AgreeCheckbox.module.scss';

export default class AgreeCheckbox extends Component<AgreeCheckboxProps, Record<string, never>> {
  render() {
    const { forwardRef, errorsArr, errReset } = this.props;
    return (
      <div className={styles.agree}>
        <input
          type="checkbox"
          name={FormFieldTypes.AGREE}
          id="agree"
          ref={forwardRef}
          onChange={(e) => errReset(e)}
        />
        <label htmlFor="agree">I agree to the processing of personal data</label>
        {errorsArr.includes(ErrorTypes.AGREE_REQUIRED) && (
          <ErrorMessage text={ErrorMessages.AGREE_REQUIRED} />
        )}
      </div>
    );
  }
}
