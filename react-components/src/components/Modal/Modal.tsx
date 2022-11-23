import React, { Component } from 'react';

import { ModalProps } from './types';
import styles from './Modal.module.scss';

export default class Modal extends Component<ModalProps, Record<string, never>> {
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
