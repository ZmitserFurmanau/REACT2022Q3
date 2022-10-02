import React, { Component } from 'react';

import styles from './NotFound.module.scss';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <p>The requested page was not found</p>
        <img src="/img/sad.png" width="341" height="311" alt="sad" />
        <p>Page 404</p>
      </div>
    );
  }
}
