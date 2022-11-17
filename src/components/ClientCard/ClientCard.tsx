import styles from './ClientCard.module.css';
import React, { useEffect, useState, useCallback } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import Draggable, { DraggableData } from 'react-draggable';
import { ClientType, VisitsType } from '../../redux/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientActions } from '../../redux/clients/actions';
import { ModalDeleteClient } from './ModalDeleteClient';
import { ExisContainer } from './ExisContainer';
import { VisitsContainer } from './VisitsContainer';
import { ClientDataContainer, formDataType } from './ClientDataContainer';
import { Loader } from '../Loader/Loader';

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
  const [values, setValues] = useState<ClientType>(defaultValues);
  const [isVisits, toggleVisits] = useState(false);
  const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [position, setPosition] = useState<any>({ positionX: 320 });
  const [clientAvatar, setClientAvatar] = useState<string | null>(null);
  const [clientName, setClientName] = useState<string>('');
  const [formData, setFormData] = useState<any>();

  const client = useAppSelector((state) => state.clientReducer.client);
  const isClientLoading = useAppSelector((state) => state.clientReducer.isClientLoading);

  useEffect(() => {
    if (clientId) {
      dispatch(clientActions.getClient(clientId));
    }
  }, [clientId]);

  useEffect(() => {
    if (Object.keys(client).length !== 0 && isOpenClientModal) {
      setValues(client);
    }
  }, [client]);

  // useEffect(() => {
  //   if (values.pinnedExisId) {
  //     setPinnedMessage(values?.exises?.find((exis) => exis.id === values.pinnedExisId));
  //   } else {
  //     setPinnedMessage(undefined);
  //   }
  // }, [values]);

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

  // const pinExis = (exisId: string) => {
  //   exisId === '' && setPinnedMessage(undefined);
  //   dispatch(clientActions.editClient({ ...values, pinnedExisId: exisId }));
  // };

  const submit = () => {
    console.log(formData);
  };

  const getFormData = (formData: formDataType) => {
    setFormData(formData);
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
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
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
                      setOpenDeleteClient={setOpenDeleteClient}
                      getFormData={getFormData}
                    />
                  )}
                </div>

                <div>
                  {!isVisits && <div className={styles.horizontalLine} />}
                  <div className={styles.submitButtonsWrapper}>
                    <Button
                      outlined
                      className={styles.submitButton}
                      onClick={() => setOpenClientModal(false)}
                    >
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
