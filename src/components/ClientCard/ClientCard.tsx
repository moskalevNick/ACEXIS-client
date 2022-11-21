import styles from './ClientCard.module.css';
import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import Draggable, { DraggableData } from 'react-draggable';
import { ClientType, ImageType, VisitsType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { ModalDeleteClient } from './ModalDeleteClient';
import { ExisContainer } from './ExisContainer';
import { VisitsContainer } from './VisitsContainer';
import { ClientDataContainer } from './ClientDataContainer';
import { Loader } from '../Loader/Loader';

type ClientCardType = {
  isOpenClientModal: boolean;
  setOpenClientModal: (state: boolean) => void;
  clientId?: string;
};

type updateFormDataType = {
  status: string;
  phoneInputStr: string;
  bills?: number[] | undefined;
};

const defaultValues: ClientType = {
  name: '',
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
  const [formData, setFormData] = useState<ClientType>();
  const [nameInputStr, setNameInputStr] = useState<string>(values.name);

  useEffect(() => {
    if (clientId) {
      dispatch(clientActions.getClient(clientId));
    }
  }, [clientId]);

  useEffect(() => {
    if (client && Object.keys(client).length !== 0 && isOpenClientModal) {
      setValues(client);
      setFormData(client);
      setNameInputStr(client.name);
    }
  }, [client]);

  useEffect(() => {
    values.visits?.forEach((el) => {
      if (Number(el.date) > Number(lastVisit)) {
        setLastVisit(el);
      }
    });
  }, [values]);

  useEffect(() => {
    setValues((prev) => {
      return {
        ...prev,
        name: nameInputStr,
      };
    });
    setFormData((prev) => {
      return {
        ...prev,
        status: values.status,
        phone: values.phone,
        name: nameInputStr,
      };
    });
  }, [nameInputStr]);

  const onDrag = ({ x }: DraggableData) => {
    const min = 220;
    const max = 338;
    if (x >= min || x <= max) setPosition({ positionX: x });
    if (x < min) setPosition({ positionX: min });
    if (x > max) setPosition({ positionX: max });
  };

  const submit = () => {
    delete formData?.id;
    delete formData?.UserId;
    delete formData?.images;
    delete formData?.visits;

    if (clientId && client?.id && formData) {
      dispatch(clientActions.editClient({ newClient: formData, id: client.id }));
    } else if (newClient?.id && formData) {
      dispatch(
        clientActions.editClient({
          newClient: { ...formData },
          id: newClient.id,
        }),
      );
    }
    setOpenClientModal(false);
  };

  const cancelAddingClient = () => {
    if (newClient?.id) {
      dispatch(clientActions.deleteClient(newClient.id));
    }
    setOpenClientModal(false);
  };

  const updateFormData = (data: updateFormDataType) => {
    setFormData((prev) => {
      return {
        ...prev,
        name: values.name,
        status: data.status,
        phone: data.phoneInputStr,
        bills: data.bills,
      };
    });
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
          <Input
            placeholder={values.name ? '' : 'Enter client name'}
            className={styles.clientNameInput}
            value={nameInputStr}
            onChange={(e) => setNameInputStr(e.target.value)}
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
                      setOpenDeleteClient={setOpenDeleteClient}
                      setClientAvatar={setClientAvatar}
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
