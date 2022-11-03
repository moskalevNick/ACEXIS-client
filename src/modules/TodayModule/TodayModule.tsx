import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { selectFSCamera } from '../../redux/reducers/globalReducer';
import { clients } from './mock';
import styles from './Today.module.css';

export type ExisType = {
  id: string;
  date: Date;
  text: string;
};

export type VisitsType = {
  date: Date;
  exisId?: string;
};

export type ClientType = {
  imgPath: string[];
  name?: string;
  status: string;
  coincidentIds?: string[];
  id: string;
  bills: number[];
  visits: VisitsType[];
  exises: ExisType[];
  pinnedExisId?: string;
  phoneNumber?: string;
};

export const TodayModule = () => {
  const isOpenFullScreenCamera = useSelector(selectFSCamera);
  const containerClassnames = classNames(
    styles.container,
    isOpenFullScreenCamera && styles.containerWithCamera,
  );

  return (
    <div className={containerClassnames}>
      <div className={styles.label}>Today</div>
      <CardContainer clients={clients} withShortNavbar />
    </div>
  );
};
