import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Loader.module.css';

export const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.loader} />
        <p className={styles.text}>{t('loading')}</p>
      </div>
    </div>
  );
};
