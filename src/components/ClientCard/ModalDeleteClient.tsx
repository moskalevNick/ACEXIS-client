import styles from './ClientCard.module.css';
import React from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, ImageType } from '../../types';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

type DeleteClientModalType = {
  isOpenDeleteClient: boolean;
  setOpenDeleteClient: (state: boolean) => void;
  clientAvatar: ImageType | null;
  client: ClientType;
};

const getDeleteIcon = (status: string) => {
  switch (status) {
    case 'ghost':
      return <GhostStatusIcon />;
    case 'cookie':
      return <CookieStatusIcon />;
    case 'moon':
      return <MoonStatusIcon />;
    case 'goal':
      return <GoalStatusIcon />;
    case 'wheel':
      return <WheelStatusIcon />;
  }
};

export const ModalDeleteClient: React.FC<DeleteClientModalType> = ({
  isOpenDeleteClient,
  setOpenDeleteClient,
  clientAvatar,
  client,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const lastVisit = useAppSelector((state) => state.visitReducer.lastVisits[client.id]);

  const deleteClient = () => {
    if (client.id) {
      dispatch(clientActions.deleteClient(client.id));
    }
    setOpenDeleteClient(false);

    navigate(-1);
  };

  return (
    <Modal
      onClose={() => setOpenDeleteClient(false)}
      open={isOpenDeleteClient}
      className={styles.modalDeleteClient}
      label={t('delete_client') as string}
    >
      <div className={styles.contentWrapperDeleteClientModal}>
        <div className={styles.contentDeleteModal}>
          {t('are_you_sure_you_want_to_delete_the_client')}
        </div>
        <div className={styles.deleteClientInfoWrapper}>
          {clientAvatar && (
            <img
              src={clientAvatar.publicUrl}
              alt={`avatar_${clientAvatar}`}
              className={styles.deleteClientImg}
            />
          )}
          <div className={styles.deleteClientDataWrapper}>
            <div className={styles.deleteClientName}>{client.name}</div>
            <div className={styles.deleteClientTextWrapper}>
              <div className={styles.deleteClientLabelContent}>{t('last_visit')}</div>
              {lastVisit ? getInterval(lastVisit.date) : t('no_visits')}
            </div>
            <div className={styles.deleteClientTextWrapper}>
              <div className={styles.deleteClientLabelContent}>{t('average_bill')}</div>
              {client.averageBill || t('no_bills')}
            </div>
            <div className={styles.deleteClientTextWrapper}>
              <div className={styles.deleteClientStatus}>{getDeleteIcon(client.status)}</div>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.cancelButton}
            outlined
            onClick={() => setOpenDeleteClient(false)}
          >
            {t('cancel')}
          </Button>
          <Button className={styles.logoutButton} onClick={deleteClient}>
            {t('delete')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
