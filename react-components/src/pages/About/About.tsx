import React, { Component } from 'react';

import styles from './About.module.scss';

export default class About extends Component {
  render() {
    return (
      <div className={styles.wrapper} data-testid="about">
        <h1 className={styles.title}>About Us</h1>
        <p>The most delicious pizza on the all internet 👌</p>
      </div>
    );
  }
}
