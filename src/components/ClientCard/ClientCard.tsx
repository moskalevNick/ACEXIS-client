import styles from './ClientCard.module.css';
import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import Draggable, { DraggableData } from 'react-draggable';
import { ClientType, ImageType, VisitsType } from '../../redux/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { ModalDeleteClient } from './ModalDeleteClient';
import { ExisContainer } from './ExisContainer';
import { VisitsContainer } from './VisitsContainer';
import { ClientDataContainer, formDataType } from './ClientDataContainer';
import { Loader } from '../Loader/Loader';
import { clientSettingsActions } from '../../redux/clients/reducers';

type ClientCardType = {
  isOpenClientModal: boolean;
  setOpenClientModal: (state: boolean) => void;
  clientId?: string;
};

const defaultValues: ClientType = {
  name: 'Client name',
  status: 'ghost',
  phone: '',
};

export const ClientCard: React.FC<ClientCardType> = ({
  isOpenClientModal,
  setOpenClientModal,
  clientId,
}) => {
  const dispatch = useAppDispatch();
  const client = useAppSelector((state) => state.clientReducer.client);
  const newClient = useAppSelector((state) => state.clientReducer.newClient);
  const isClientLoading = useAppSelector((state) => state.clientReducer.isClientLoading);

  const [values, setValues] = useState<ClientType>(client || defaultValues);
  const [isVisits, toggleVisits] = useState(false);
  const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [position, setPosition] = useState<any>({ positionX: 320 });
  const [clientAvatar, setClientAvatar] = useState<ImageType | null>(null);
  const [newClientName, setNewClientName] = useState<string>('');
  const [formData, setFormData] = useState<any>();

  useEffect(() => {
    if (clientId) {
      dispatch(clientActions.getClient(clientId));
    }
  }, [clientId]);

  useEffect(() => {
    if (client && Object.keys(client).length !== 0 && isOpenClientModal) {
      setValues(client);
    }
  }, [client]);

  useEffect(() => {
    values.visits?.forEach((el) => {
      if (Number(el.date) > Number(lastVisit)) {
        setLastVisit(el);
      }
    });
  }, [values]);

  const onDrag = ({ x }: DraggableData) => {
    const min = 220;
    const max = 338;
    if (x >= min || x <= max) setPosition({ positionX: x });
    if (x < min) setPosition({ positionX: min });
    if (x > max) setPosition({ positionX: max });
  };

  const submit = () => {
    if (clientId && client?.id) {
      dispatch(clientActions.editClient({ newClient: formData, id: client.id }));
    } else if (newClient?.id) {
      dispatch(
        clientActions.editClient({
          newClient: { ...formData, name: newClientName },
          id: newClient.id,
        }),
      );
    }
    setOpenClientModal(false);
  };

  const getFormData = (formData: formDataType) => {
    setFormData(formData);
  };

  const cancelAddingClient = () => {
    setOpenClientModal(false);
  };

  const settingsClassnames = classNames(styles.section, !isVisits && styles.activeSection);
  const visitsClassnames = classNames(styles.section, isVisits && styles.activeSection);

  return (
    <Modal
      onClose={() => setOpenClientModal(false)}
      open={isOpenClientModal}
      className={styles.modalClient}
    >
      {isClientLoading ? (
        <Loader />
      ) : (
        <>
          {clientId ? (
            <div className={styles.headerClientNameWrapper}>
              <div className={styles.headerClientName}>{values.name}</div>
            </div>
          ) : (
            <Input
              placeholder="Enter client name"
              className={styles.clientNameInput}
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
            />
          )}
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
                {clientId && (
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
                    <VisitsContainer visits={values.visits} />
                  ) : (
                    <ClientDataContainer
                      lastVisit={lastVisit}
                      client={values}
                      isNew={!Boolean(clientId)}
                      newClientName={newClientName}
                      setOpenDeleteClient={setOpenDeleteClient}
                      getFormData={getFormData}
                      setClientAvatar={setClientAvatar}
                      clientAvatar={clientAvatar}
                    />
                  )}
                </div>

                <div>
                  {!isVisits && <div className={styles.horizontalLine} />}
                  <div className={styles.submitButtonsWrapper}>
                    <Button outlined className={styles.submitButton} onClick={cancelAddingClient}>
                      Cancel
                    </Button>
                    <Button className={styles.submitButton} onClick={submit}>
                      {clientId ? 'Save' : 'Add visitor'}
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

            <ExisContainer clientId={clientId} />
          </div>
          <ModalDeleteClient
            isOpenDeleteClient={isOpenDeleteClient}
            setOpenDeleteClient={setOpenDeleteClient}
            clientAvatar={clientAvatar}
            client={values}
            lastVisit={lastVisit}
          />
        </>
      )}
    </Modal>
  );
};
