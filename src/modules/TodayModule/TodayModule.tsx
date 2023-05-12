import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { Loader } from '../../components/Loader/Loader';
import { todayEnd, todayStart } from '../../helpers/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { imagesActions } from '../../redux/images/actions';
import { imageSettingsActions } from '../../redux/images/reducers';
import styles from './Today.module.css';
import { Button } from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';

export const TodayModule = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [tickedClientIds, setTickedClientIds] = useState<string[]>([]);
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { clients, isLoading } = useAppSelector((state) => state.clientReducer);
  const { isFaceOnCamera } = useAppSelector((state) => state.imageReducer);
  const { cameraToken } = useAppSelector((state) => state.globalReducer);
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
    const interval = setInterval(() => {
      dispatch(imagesActions.getStream(cameraToken));
    }, 500);
    return () => {
      clearInterval(interval);
      dispatch(imageSettingsActions.resetCameraFrame());
    };
  }, [dispatch, cameraToken]);

  useEffect(() => {
    if (isFaceOnCamera) {
      const timeout = setTimeout(() => {
        dispatch(clientActions.getClients());
        dispatch(imageSettingsActions.resetFaceOnCamera());
      }, 1000);

      return clearTimeout(timeout);
    }
  }, [dispatch, isFaceOnCamera]);

  const removeClients = () => {
    tickedClientIds.forEach((id) => {
      dispatch(clientActions.deleteClient(id));
    });
  };

  const getTickClients = (clientIds: string[]) => {
    setTickedClientIds(clientIds);
  };

  return (
    <div className={containerClassnames}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>Today</div>
        <Button className={styles.removeTickIconsButton} onClick={removeClients}>
          {t('remove_clients')}
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <CardContainer clients={clients} withShortNavbar getTickClients={getTickClients} />
      )}
    </div>
  );
};
