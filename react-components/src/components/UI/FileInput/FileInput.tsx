import React, { Component } from 'react';

import { FileInputProps } from './types';
import { ErrorTypes, FormFieldTypes } from '../../../utils/types';
import RequiredMessage from '../../Validation/RequiredMessage';

export default class FileInput extends Component<FileInputProps, Record<string, never>> {
  render() {
    const { forwardRef, errorsArr, errReset } = this.props;
    return (
      <label className="label">
        <span className="label-text">
          Additional information <br /> (photo):
        </span>
        <input
          type="file"
          name={FormFieldTypes.IMAGE}
          ref={forwardRef}
          onChange={(e) => errReset(e)}
        />
        {errorsArr.includes(ErrorTypes.IMAGE_REQUIRED) && <RequiredMessage />}
      </label>
    );
  }
}
