import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { CardContainer } from '../../components/CardContainer/CardContainer';

import { PlusIcon } from '../../components/Icons/PlusIcon';

import styles from './Cloud.module.css';
import { clientActions } from '../../redux/clients/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { CloudFilters } from '../../components/CloudFilters';

const wording = ['Customers added yesterday', 'Customers added for selected period'];

export const CloudModule = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isFullScreenCameraOpen, filters } = useAppSelector((state) => state.globalReducer);
  const { clients, isLoading } = useAppSelector((state) => state.clientReducer);

  const containerClassnames = classNames(
    styles.container,
    isFullScreenCameraOpen && styles.containerWithCamera,
  );

  useEffect(() => {
    if (!id) {
      dispatch(clientActions.getClients());
    }
  }, [dispatch, id]);

  const addNewClient = () => {
    navigate('/cloud/new');
    // dispatch(clientActions.addClient({ name: '', status: 'ghost', phone: '' }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={containerClassnames}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>Cloud</div>
        <Button beforeIcon={<PlusIcon />} className={styles.addButton} onClick={addNewClient} />
        <div className={styles.wordingWrapper}>{filters.date ? wording[1] : wording[0]}</div>
        <div className={styles.counterWrapper}>
          <div className={styles.counter}>{`${clients.length} clients`}</div>
        </div>
      </div>

      <CloudFilters />

      {clients.length ? (
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
