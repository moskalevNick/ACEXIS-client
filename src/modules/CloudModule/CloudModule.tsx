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
import { FiltersType } from '../../types';

export const CloudModule = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isFullScreenCameraOpen } = useAppSelector((state) => state.globalReducer);
  const { clients, isLoading, isClientLoading, filters } = useAppSelector(
    (state) => state.clientReducer,
  );

  const [actualFilters, setActualFilters] = useState<FiltersType>(filters);

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
      defaultDateRange.startDate.toDateString() ===
        new Date(filters.date.startDate).toDateString() &&
      defaultDateRange.endDate.toDateString() === new Date(filters.date.endDate).toDateString()
    ) {
      return 'Customers added yesterday';
    } else return 'Customers added for selected period';
  };

  useEffect(() => {
    dispatch(clientSettingsActions.clearCurrentClient());
  }, [dispatch]);

  useEffect(() => {
    if (!id && !isClientLoading) {
      const dateForServer = {
        startDate: yesterdayStartDay.toISOString(),
        endDate: yesterdayEndDay.toISOString(),
      };

      dispatch(clientSettingsActions.setFilterDate(dateForServer));
      dispatch(clientActions.getClients());
    }
  }, [dispatch, id, isClientLoading]);

  useEffect(() => {
    if (JSON.stringify(actualFilters) !== JSON.stringify(filters)) {
      setActualFilters(filters);
      dispatch(clientActions.getClients());
    }
  }, [filters, actualFilters, dispatch]);

  const addNewClient = () => {
    navigate('/cloud/new');
  };

  return (
    <div className={containerClassnames}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>Cloud</div>
        <Button beforeIcon={<PlusIcon />} className={styles.addButton} onClick={addNewClient} />
        <div className={styles.wordingWrapper}>{isDefault()}</div>
        <div className={styles.counterWrapper}>
          <div className={styles.counter}>{`${clients.length} clients`}</div>
        </div>
      </div>

      <CloudFilters />

      {isLoading || isClientLoading ? (
        <Loader />
      ) : clients.length ? (
        <CardContainer clients={clients} withLongNavbar />
      ) : (
        <div className={styles.noClientsWrapper}>
          No client cards found. You can add them
          <Button beforeIcon={<PlusIcon />} className={styles.addButton} onClick={addNewClient} />
        </div>
      )}
    </div>
  );
};
