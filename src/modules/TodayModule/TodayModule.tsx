import classNames from 'classnames';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { selectFSCamera } from '../../redux/reducers/globalReducer';
import styles from './Today.module.css';

export const TodayModule = () => {
  const isOpenFullScreenCamera = useSelector(selectFSCamera);
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
