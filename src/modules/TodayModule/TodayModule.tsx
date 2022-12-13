import classNames from 'classnames';
import React, { useEffect } from 'react';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { Loader } from '../../components/Loader/Loader';
import { todayEnd, todayStart } from '../../helpers/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { imageSettingsActions } from '../../redux/images/reducers';
import styles from './Today.module.css';

export const TodayModule = () => {
  const dispatch = useAppDispatch();
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { clients, isLoading } = useAppSelector((state) => state.clientReducer);
  const { isFaceOnCamera } = useAppSelector((state) => state.imageReducer);
  const containerClassnames = classNames(
    styles.container,
    isOpenFullScreenCamera && styles.containerWithCamera,
  );

  useEffect(() => {
    const dateForServer = {
      startDate: todayStart.toISOString(),
      endDate: todayEnd.toISOString(),
    };

    dispatch(clientSettingsActions.setFilterDate(dateForServer));
    dispatch(clientActions.getClients());
  }, [dispatch]);

  useEffect(() => {
    if (isFaceOnCamera) {
      setTimeout(() => {
        dispatch(clientActions.getClients());
        dispatch(imageSettingsActions.resetFaceOnCamera());
      }, 1000);
    }
  }, [dispatch, isFaceOnCamera]);

  return (
    <div className={containerClassnames}>
      <div className={styles.label}>Today</div>
      {isLoading ? <Loader /> : <CardContainer clients={clients} withShortNavbar />}
    </div>
  );
};
