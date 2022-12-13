import styles from './ErrorMessage.module.css';
import React from 'react';
import { WarningIcon } from '../Icons/WarningIcon';

type ErrorMessageType = {
  msg: string;
};

export const ErrorMessage: React.FC<ErrorMessageType> = ({ msg }) => {
  return (
    <div className={styles.wrapper}>
      <WarningIcon />
      {msg}
    </div>
  );
};
