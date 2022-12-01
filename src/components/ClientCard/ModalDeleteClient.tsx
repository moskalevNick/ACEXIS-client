import styles from './ClientCard.module.css';
import React from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, ImageType, VisitsType } from '../../types';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { useAppDispatch } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { useNavigate } from 'react-router-dom';

type DeleteClientModalType = {
  isOpenDeleteClient: boolean;
  setOpenDeleteClient: (state: boolean) => void;
  clientAvatar: ImageType | null;
  client: ClientType;
  lastVisit: VisitsType | null;
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
  lastVisit,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      label="Delete client"
    >
      <div className={styles.contentWrapperDeleteClientModal}>
        <div className={styles.contentDeleteModal}>Are you sure you want to delete the client?</div>
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
              <div className={styles.deleteClientLabelContent}>Last visit</div>
              {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
            </div>
            <div className={styles.deleteClientTextWrapper}>
              <div className={styles.deleteClientLabelContent}>Average bill</div>
              {client.averageBill || 'No bills'}
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
            Cancel
          </Button>
          <Button className={styles.logoutButton} onClick={deleteClient}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
