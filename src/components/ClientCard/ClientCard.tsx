import styles from './ClientCard.module.css';
import React, { useEffect, useState, useMemo, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import Draggable, { DraggableData } from 'react-draggable';
import { ClientType, CreateClientType, ImageType, VisitsType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { ModalDeleteClient } from './ModalDeleteClient';
import { ExisContainer } from './ExisContainer';
import { VisitsContainer } from './VisitsContainer';
import { ClientDataContainer } from './ClientDataContainer';

type updateFormDataType = {
  status: string;
  phoneInputStr: string;
  bills?: number[] | undefined;
};

const defaultValues: CreateClientType = {
  name: '',
  status: 'ghost',
  phone: '',
};

export const ClientCard: FC<{ currentClient: ClientType }> = ({ currentClient }) => {
  const [client, setClient] = useState(currentClient);
  const [position, setPosition] = useState<{ positionX: number }>({ positionX: 320 });
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [isVisits, toggleVisits] = useState(false);
  const [clientImages, setClientImages] = useState<ImageType[] | []>([]);
  const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);
  const [formData, setFormData] = useState<CreateClientType>(defaultValues);

  const settingsClassnames = classNames(styles.section, !isVisits && styles.activeSection);
  const visitsClassnames = classNames(styles.section, isVisits && styles.activeSection);

  const images = useAppSelector((state) => state.imageReducer.images);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    client?.visits?.forEach((el) => {
      if (Number(el.date) > Number(lastVisit)) {
        setLastVisit(el);
      }
    });
    client?.name &&
      setFormData((prev) => {
        return { ...prev, name: client.name };
      });
  }, [client]);

  useEffect(() => {
    if (client && images[client?.id]) {
      const currentClientImages = images[client?.id];
      setClientImages(currentClientImages);
    }
  }, [images, client]);

  const clientAvatar = useMemo(() => {
    if (clientImages.length > 0) {
      return clientImages[clientImages.length - 1];
    }
    return null;
  }, [clientImages]);

  const onChangeName = (e: any) => {
    if (client) {
      setClient({ ...client, name: e.target.value });
    }
  };

  const onSubmit = () => {
    if (formData && client?.id) {
      dispatch(clientActions.editClient({ newClient: formData, id: client.id }));
    }
    onClose();
  };

  const onClose = () => {
    navigate('/cloud');
  };

  const onDrag = ({ x }: DraggableData) => {
    const min = 220;
    const max = 338;
    if (x >= min || x <= max) setPosition({ positionX: x });
    if (x < min) setPosition({ positionX: min });
    if (x > max) setPosition({ positionX: max });
  };

  const cancelAddingClient = () => {
    dispatch(clientActions.deleteClient(client.id));
    onClose();
  };

  const updateFormData = (data: updateFormDataType) => {
    setFormData((prev) => {
      return {
        ...prev,
        status: data.status,
        phone: data.phoneInputStr,
        bills: data.bills,
      };
    });
  };

  return (
    <>
      <Input
        placeholder={client.name ? '' : 'Enter client name'}
        className={styles.clientNameInput}
        onChange={onChangeName}
        value={client.name}
      />
      <div className={styles.horizontalLine} />
      <div className={styles.contentWrapper}>
        <div
          style={{
            minWidth: '716px',
            maxWidth: '836px',
            width: position.positionX + 500,
          }}
        >
          <div className={styles.clientDataWrapper}>
            {client.id && (
              <div className={styles.settingsToggle}>
                <div className={styles.wrapperSectionToggle}>
                  <button className={settingsClassnames} onClick={() => toggleVisits(false)}>
                    Settings
                  </button>
                  <button className={visitsClassnames} onClick={() => toggleVisits(true)}>
                    Visits
                  </button>
                </div>
                <div className={styles.horizontalLine} />
              </div>
            )}

            <div className={styles.clientDataContainer}>
              {isVisits ? (
                <VisitsContainer visits={client.visits} />
              ) : (
                <ClientDataContainer
                  clientImages={clientImages}
                  client={client}
                  lastVisit={lastVisit}
                  setOpenDeleteClient={setOpenDeleteClient}
                  // setClientAvatar={setClientAvatar}
                  clientAvatar={clientAvatar}
                  updateFormData={updateFormData}
                />
              )}
            </div>

            <div>
              {!isVisits && <div className={styles.horizontalLine} />}
              <div className={styles.submitButtonsWrapper}>
                <Button outlined className={styles.submitButton} onClick={cancelAddingClient}>
                  Cancel
                </Button>
                <Button className={styles.submitButton} onClick={onSubmit}>
                  {id !== 'new' ? 'Save' : 'Add visitor'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.draggableWrapper}>
          <Draggable
            defaultPosition={{ x: 0, y: 0 }}
            position={{ x: position.positionX, y: 0 }}
            onDrag={(e, data) => onDrag(data)}
          >
            <div className={styles.handler} />
          </Draggable>
        </div>

        <ExisContainer clientId={client.id} />
      </div>
      <ModalDeleteClient
        isOpenDeleteClient={isOpenDeleteClient}
        setOpenDeleteClient={setOpenDeleteClient}
        clientAvatar={clientAvatar}
        client={client}
        lastVisit={lastVisit}
      />
    </>
  );
};
