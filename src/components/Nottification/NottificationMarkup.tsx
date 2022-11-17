import React from 'react';
import styles from './Nottification.module.css';

type nottificationMarkupType = {
  clientName?: string;
  clientAvatar?: string;
  text?: string;
};

export const NottificationMarkup: React.FC<nottificationMarkupType> = ({
  clientName = 'nikolay',
  clientAvatar = 'https://static.boredpanda.com/blog/wp-content/uploads/2017/11/My-most-popular-pic-since-I-started-dog-photography-5a0b38cbd5e1e__880.jpg',
  text = 'success',
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={clientAvatar} />
      <div className={styles.clientNameWrapper}>{clientName}</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
