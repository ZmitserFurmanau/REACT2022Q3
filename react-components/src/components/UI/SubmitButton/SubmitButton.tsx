import React, { Component } from 'react';

import { SubmitButtonProps } from './types';
import styles from './SubmitButton.module.scss';

export default class SubmitButton extends Component<SubmitButtonProps, Record<string, never>> {
  render() {
    const { isButtonDisabled, errorsArr } = this.props;
    return (
      <button
        type="submit"
        className={styles.button}
        disabled={isButtonDisabled || errorsArr.length > 0}
      >
        Make your order
      </button>
    );
  }
}
