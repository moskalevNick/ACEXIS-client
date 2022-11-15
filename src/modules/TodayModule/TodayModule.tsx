import classNames from 'classnames';
import React from 'react';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { useAppSelector } from '../../hooks/redux';
import styles from './Today.module.css';

export const TodayModule = () => {
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const containerClassnames = classNames(
    styles.container,
    isOpenFullScreenCamera && styles.containerWithCamera,
  );

  return (
    <div className={containerClassnames}>
      <div className={styles.label}>Today</div>
      <CardContainer clients={[]} withShortNavbar />
    </div>
  );
};
