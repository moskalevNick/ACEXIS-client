import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { CardContainer } from '../../components/CardContainer/CardContainer';

import { PlusIcon } from '../../components/Icons/PlusIcon';

import styles from './Cloud.module.css';
import { clientActions } from '../../redux/clients/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { CloudFilters } from '../../components/CloudFilters';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { yesterdayEndDay, yesterdayStartDay } from '../../helpers/constants';
import { visitSettingsActions } from '../../redux/visit/reducers';
import { exisSettingsActions } from '../../redux/exis/reducers';
import { useTranslation } from 'react-i18next';

export const CloudModule = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [tickedClientIds, setTickedClientIds] = useState<string[]>([]);
  const { isFullScreenCameraOpen } = useAppSelector((state) => state.globalReducer);
  const { clients, isLoading, isClientLoading, filters } = useAppSelector(
    (state) => state.clientReducer,
  );

  const containerClassnames = classNames(
    styles.container,
    isFullScreenCameraOpen && styles.containerWithCamera,
  );

  const isDefault = () => {
    const defaultDateRange = {
      startDate: yesterdayStartDay,
      endDate: yesterdayEndDay,
    };

    if (
      filters.date.startDate &&
      filters.date.endDate &&
      defaultDateRange.startDate.toDateString() ===
        new Date(filters.date.startDate).toDateString() &&
      defaultDateRange.endDate.toDateString() === new Date(filters.date.endDate).toDateString()
    ) {
      return t('customers_added_yesterday');
    } else return t('customers_added_for_selected_period');
  };

  useEffect(() => {
    if (!id) {
      dispatch(visitSettingsActions.clearVisits());
      dispatch(exisSettingsActions.clearExises());
      dispatch(clientSettingsActions.clearCurrentClient());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!id && !isClientLoading) {
      dispatch(clientActions.getClients());
    }
  }, [dispatch, id, isClientLoading, filters]);

  // useEffect(() => {
  //   const dateForServer = {
  //     startDate: yesterdayStartDay.toISOString(),
  //     endDate: yesterdayEndDay.toISOString(),
  //   };
  //   dispatch(clientSettingsActions.setFilterDate(dateForServer));
  // }, [dispatch]);

  const addNewClient = () => {
    navigate('/cloud/new');
  };

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
        <div className={styles.label}>Cloud</div>
        <Button beforeIcon={<PlusIcon />} className={styles.addButton} onClick={addNewClient} />
        <div className={styles.wordingWrapper}>{isDefault()}</div>
        <div className={styles.counterWrapper}>
          <div className={styles.counter}>{`${clients.length} ${t('clients')}`}</div>
        </div>
        <Button className={styles.removeTickIconsButton} onClick={removeClients}>
          {t('remove_clients')} {}
        </Button>
      </div>

      <CloudFilters />

      {isLoading || isClientLoading ? (
        <Loader />
      ) : clients.length ? (
        <CardContainer clients={clients} withLongNavbar getTickClients={getTickClients} />
      ) : (
        <div className={styles.noClientsWrapper}>
          {t('no_client_card_you_can_add_them')}
          <Button beforeIcon={<PlusIcon />} className={styles.addButton} onClick={addNewClient} />
        </div>
      )}
    </div>
  );
};
