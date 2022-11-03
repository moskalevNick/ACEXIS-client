import React from 'react';
import styles from './Loader.module.css';

type Props = {
  text?: string;
};

export const Loader = ({ text = 'Loading' }: Props) => (
  <div className={styles.container}>
    <div className={styles.box}>
      <div className={styles.loader} />
      <p className={styles.text}>{text}</p>
    </div>
  </div>
);
