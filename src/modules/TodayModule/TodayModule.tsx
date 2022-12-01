import classNames from 'classnames';
import React, { useEffect } from 'react';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { Loader } from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { clientSettingsActions } from '../../redux/clients/reducers';
import styles from './Today.module.css';

export const TodayModule = () => {
  const dispatch = useAppDispatch();
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { clients, isLoading } = useAppSelector((state) => state.clientReducer);
  const containerClassnames = classNames(
    styles.container,
    isOpenFullScreenCamera && styles.containerWithCamera,
  );

  useEffect(() => {
    const dateForServer = {
      startDate: new Date(new Date().setHours(0, 0, 1)).toISOString(),
      endDate: new Date(new Date().setHours(23, 59, 59)).toISOString(),
    };

    dispatch(clientSettingsActions.setFilterDate(dateForServer));
    dispatch(clientActions.getClients());
  }, [dispatch]);

  return (
    <div className={containerClassnames}>
      <div className={styles.label}>Today</div>
      {isLoading ? <Loader /> : <CardContainer clients={clients} withShortNavbar />}
    </div>
  );
};
