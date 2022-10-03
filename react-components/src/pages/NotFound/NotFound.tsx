import React, { Component } from 'react';

import styles from './NotFound.module.scss';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.wrapper} data-testid="not-found">
        <h1 className={styles.title}>404</h1>
        <p>The requested page was not found 🙁</p>
        <img src="/img/sad.png" width="341" height="311" alt="sad" />
      </div>
    );
  }
}
