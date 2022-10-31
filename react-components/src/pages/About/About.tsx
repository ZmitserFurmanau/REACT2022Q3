import React, { FC } from 'react';

import styles from './About.module.scss';

const About: FC = () => {
  return (
    <div className={styles.wrapper} data-testid="about">
      <p>The most delicious pizza on the all internet 👌</p>
    </div>
  );
};

export default About;
