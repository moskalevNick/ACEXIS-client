import styles from './ClientCard.module.css';
import React, { useEffect, useState, useMemo, FC } from 'react';
import { useNavigate } from 'react-router-dom';

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
  isNew: boolean;
  clientId?: string;
};

type updateFormDataType = {
  status: string;
  phoneInputStr: string;
  bills?: number[] | undefined;
};

// const defaultValues: ClientType = {
//   id: 'new',
//   name: '',
//   status: 'ghost',
//   phone: '',
//   images: [],
// };

export const ClientCard: FC<{ currentClient: ClientType | null }> = ({ currentClient }) => {
  const [client, setClient] = useState(currentClient);
  const [position, setPosition] = useState<{ positionX: number }>({ positionX: 320 });
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [isVisits, toggleVisits] = useState(false);
  const [clientImages, setClientImages] = useState<ImageType[] | []>([]);
  const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);

  const settingsClassnames = classNames(styles.section, !isVisits && styles.activeSection);
  const visitsClassnames = classNames(styles.section, isVisits && styles.activeSection);

  const images = useAppSelector((state) => state.imageReducer.images);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const onSubmit = () => {};

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
    if (client?.id) {
      dispatch(clientActions.deleteClient(client.id));
    }
    onClose();
  };

  if (!client) {
    return null;
  }

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
                  // lastVisit={lastVisit}
                  // isNew={!Boolean(clientId)}
                  // setOpenDeleteClient={setOpenDeleteClient}
                  // setClientAvatar={setClientAvatar}
                  clientAvatar={clientAvatar}
                  // updateFormData={updateFormData}
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
                  {client.id ? 'Save' : 'Add visitor'}
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

  // const client = useAppSelector((state) => state.clientReducer.currentClient);
  // const newClient = useAppSelector((state) => state.clientReducer.newClient);
  // const isClientLoading = useAppSelector((state) => state.clientReducer.isClientLoading);

  // const [values, setValues] = useState<ClientType>(client);
  // const [isVisits, toggleVisits] = useState(false);
  // const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);
  // const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  // const [position, setPosition] = useState<any>({ positionX: 320 });
  // const [clientAvatar, setClientAvatar] = useState<ImageType | null>(null);
  // const [formData, setFormData] = useState<ClientType>();
  // const [nameInputStr, setNameInputStr] = useState<string>(values.name);

  // useEffect(() => {
  //   if (client && Object.keys(client).length !== 0 && isOpenClientModal) {
  //     setValues(client);
  //     setFormData(client);
  //     setNameInputStr(client.name);
  //   }
  // }, [client]);

  // useEffect(() => {
  //   values.visits?.forEach((el) => {
  //     if (Number(el.date) > Number(lastVisit)) {
  //       setLastVisit(el);
  //     }
  //   });
  // }, [values]);

  // useEffect(() => {
  //   setValues((prev) => {
  //     return {
  //       ...prev,
  //       name: nameInputStr,
  //     };
  //   });
  //   setFormData((prev) => {
  //     return {
  //       ...prev,
  //       status: values.status,
  //       phone: values.phone,
  //       name: nameInputStr,
  //     };
  //   });
  // }, [nameInputStr]);

  // const submit = () => {
  // delete formData?.id;
  // delete formData?.UserId;
  // delete formData?.images;
  // delete formData?.visits;

  // if (clientId && client?.id && formData) {
  //   dispatch(clientActions.editClient({ newClient: formData, id: client.id }));
  // } else if (newClient?.id && formData) {
  //   dispatch(
  //     clientActions.editClient({
  //       newClient: { ...formData },
  //       id: newClient.id,
  //     }),
  //   );
  // }
  // setOpenClientModal(false);
  // };

  // const updateFormData = (data: updateFormDataType) => {
  // setFormData((prev) => {
  //   return {
  //     ...prev,
  //     name: values.name,
  //     status: data.status,
  //     phone: data.phoneInputStr,
  //     bills: data.bills,
  //   };
  // });
  // };
};
