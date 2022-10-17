import React, { Component } from 'react';

import { FormModalProps } from './types';
import styles from './FormModal.module.scss';

export default class FormModal extends Component<FormModalProps, Record<string, never>> {
  generateModal() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <p>Order successfully created!</p>
          <div className={styles.btnWrapper}>
            <button className={styles.button} onClick={this.props.toggleModalActive}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return this.props.isActive ? this.generateModal() : '';
  }
}
