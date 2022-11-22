import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../Modal/Modal';
import { useAppSelector } from '../../hooks/redux';
import { Loader } from '../Loader/Loader';
import { ClientCard } from '../ClientCard/ClientCard';

import styles from './ClientModal.module.css';

export const ClientModal = () => {
  const isClientLoading = useAppSelector((state) => state.clientReducer.isClientLoading);
  const currentClient = useAppSelector((state) => state.clientReducer.currentClient);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  return (
    <Modal open={true} onClose={onClose} className={styles.modalClient}>
      {isClientLoading ? <Loader /> : <ClientCard currentClient={currentClient} />}
    </Modal>
  );
};
