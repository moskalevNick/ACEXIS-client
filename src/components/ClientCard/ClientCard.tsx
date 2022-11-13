import uuid from 'react-uuid';
import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { UploadBigIcon } from '../Icons/UploadBigIcon';
import { Button } from '../Button/Button';
import { StatusBar } from '../StatusBar/StatusBar';
import { AddExisIcon } from '../Icons/AddExisIcon';
import classNames from 'classnames';
import { CrossIcon } from '../Icons/CrossIcon';
import { SquareUploadIcon } from '../Icons/SquareUploadIcon';
import { PinnedIcon } from '../Icons/PinnedIcon';
import { EditIcon } from '../Icons/EditIcon';
import { CrossInSquareIcon } from '../Icons/CrossInSquareIcon';
import Draggable, { DraggableData } from 'react-draggable';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { SquareTickIcon } from '../Icons/SquareTickIcon';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, ExisType, VisitsType } from '../../redux/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { exisActions } from '../../redux/exis/actions';
import { clientActions } from '../../redux/clients/actions';

type ClientCardType = {
  isOpenClientModal: boolean;
  setOpenClientModal: (state: boolean) => void;
  clientId?: string;
};

const defaultValues: ClientType = {
  imgIds: [],
  name: 'Client name',
  status: 'ghost',
  coincidentIds: [],
  id: '1',
  exisIds: [],
  visits: [],
  bills: [],
  userId: '',
};

export const ClientCard: React.FC<ClientCardType> = ({
  isOpenClientModal,
  setOpenClientModal,
  clientId,
}) => {
  const dispatch = useAppDispatch();
  const [billValue, setBillValue] = useState('');
  const [values, setValues] = useState<ClientType>(defaultValues);
  const [isVisits, toggleVisits] = useState(false);
  const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);
  const [isOpenDeleteExis, setOpenDeleteExis] = useState(false);
  const [deletingExis, setDeletingExis] = useState<ExisType | undefined>();
  const [editingExis, setEditingExis] = useState<ExisType>();
  const [editingExisStr, setEditingExisStr] = useState<string>('');
  const [newExisText, setNewExisText] = useState<string>('');
  const [pinnedMessage, setPinnedMessage] = useState<ExisType>();
  const [point, setPoint] = useState<null | { x: number; y: number }>(null);
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [position, setPosition] = useState<any>({ positionX: 320 });

  const client = useAppSelector((state) => state.clientReducer.client);

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

  useEffect(() => {
    if (values.pinnedExisId) {
      // setPinnedMessage(values?.exises?.find((exis) => exis.id === values.pinnedExisId));
    } else {
      setPinnedMessage(undefined);
    }
  }, [values]);

  useEffect(() => {
    editingExis ? setEditingExisStr(editingExis?.text) : setEditingExisStr('');
  }, [editingExis]);

  useEffect(() => {
    values.visits.forEach((el) => {
      if (Number(el.date) > Number(lastVisit)) {
        setLastVisit(el);
      }
    });
  }, [values]);

  const setBill = () => {
    //console.log(billValue);
  };

  const getStatus = (status: string[]) => {
    // console.log(status);
  };

  const onDrag = ({ x }: DraggableData) => {
    const min = 220;
    const max = 338;
    if (x >= min || x <= max) setPosition({ positionX: x });
    if (x < min) setPosition({ positionX: min });
    if (x > max) setPosition({ positionX: max });
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

  const confirmDeleteExis = (exis?: ExisType) => {
    setOpenDeleteExis(true);
    setDeletingExis(exis);
  };

  const deleteExis = () => {
    deletingExis && dispatch(exisActions.deleteExis(deletingExis.id));
    setOpenDeleteExis(false);
    setDeletingExis(undefined);
  };

  const editExis = (exis?: ExisType) => {
    editingExis ? setEditingExis(undefined) : setEditingExis(exis);
  };

  const redactExis = () => {
    editingExisStr &&
      editingExis?.id &&
      dispatch(exisActions.editExis({ ...editingExis, text: editingExisStr }));

    setEditingExis(undefined);
    clientId && dispatch(clientActions.getClient(clientId));
  };

  const addNewExis = () => {
    dispatch(
      exisActions.createExis({
        date: new Date(),
        text: newExisText,
        id: uuid(),
        clientId: values.id,
      }),
    );
    setNewExisText('');
    clientId && dispatch(clientActions.getClient(clientId));
  };

  useEffect(() => {
    console.log(client);
  }, [client]);

  const pinExis = (exisId: string) => {
    exisId === '' && setPinnedMessage(undefined);
    dispatch(clientActions.editClient({ ...values, pinnedExisId: exisId }));
  };

  const settingsClassnames = classNames(styles.section, !isVisits && styles.activeSection);
  const visitsClassnames = classNames(styles.section, isVisits && styles.activeSection);
  const labelFixContent = classNames(styles.labelContent, styles.labelFixContent);
  const exisWrapperClassnames = classNames(
    styles.exisesWrapper,
    pinnedMessage && styles.exisesWrapperWithPin,
  );
  const exisInputWrapperClassnames = classNames(
    styles.exisInputWrapper,
    editingExis && styles.exisEditInputWrapper,
  );

  return (
    <Modal
      onClose={() => setOpenClientModal(false)}
      open={isOpenClientModal}
      className={styles.modalClient}
    >
      {clientId ? (
        <div className={styles.headerClientNameWrapper}>
          <div className={styles.headerClientName}>{values.name}</div>
        </div>
      ) : (
        <Input placeholder="Enter client name" className={styles.clientNameInput} />
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
                <div className={styles.visitsData}>
                  <div className={styles.visitsWrapper}>
                    <div className={styles.visitsHeader}>
                      <div className={styles.visitsHeaderItem}>
                        <div className={styles.visitsHeaderlabel}>Visits</div>
                      </div>
                      <div className={styles.visitsHeaderItem}>
                        <div className={styles.visitsHeaderlabel}>Date</div>
                      </div>
                      <div className={styles.visitsHeaderItem}>
                        <div className={styles.visitsHeaderlabel}>EXIS</div>
                      </div>
                    </div>
                    <div className={styles.visitsContainer} onScroll={() => setPoint(null)}>
                      {values.visits.map((el) => (
                        <div key={el.date.toString()} className={styles.visitItemWrapper}>
                          <div className={styles.visitItem}>
                            <div className={styles.interval}>{getInterval(el.date)}</div>
                          </div>
                          <div className={styles.visitItem}>
                            <div className={styles.visitDate}>
                              {new Date(el.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className={styles.visitItem}>
                            <div
                              className={styles.exisPointWrapper}
                              onMouseEnter={(ev) => setPoint({ x: ev.clientX, y: ev.clientY })}
                              onMouseLeave={(ev) => setPoint(null)}
                            >
                              {el.exisId && (
                                <>
                                  <div className={styles.exisPoint} />
                                  <div
                                    className={styles.exisBadge}
                                    style={
                                      point
                                        ? {
                                            left: point.x + 34,
                                            top: point.y - 50,
                                          }
                                        : {}
                                    }
                                  >
                                    {/* <div className={styles.exisBadgeTime}>
                                      {new Date(
                                        values.exises.find((exis) => exis.id === el.exisId)!.date,
                                      ).toLocaleDateString()}
                                    </div>
                                    <div className={styles.exisBadgeText}>
                                      {values.exises.find((exis) => exis.id === el.exisId)?.text}
                                    </div> */}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.clientData}>
                  <div className={styles.uploadPhotoWrapper}>
                    {values.imgIds.length ? (
                      <div className={styles.photosWrapper}>
                        <div className={styles.avatarPhoto}>
                          <button className={styles.removePhotoButton}>
                            <CrossIcon />
                          </button>
                          <img
                            // src={values.imgPath[0]}
                            alt={`avatar_${values.name}`}
                            className={styles.img}
                          />
                        </div>
                        <div className={styles.photoGallery}>
                          {/* {values.imageLinks.map(
                            (el, i) =>
                              i !== values.imageLinks.length - 1 && (
                                <div className={styles.smallPhotoWrapper} key={`${el} ${i}`}>
                                  <img
                                    src={el}
                                    alt={`small_photo_${i}_${el}`}
                                    className={styles.smallImg}
                                  />
                                </div>
                              ),
                          )} */}
                          {values.imgIds.length < 5 && (
                            <button className={styles.smallUploadButtonWrapper}>
                              <SquareUploadIcon />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Button
                        className={styles.uploadButton}
                        outlined
                        beforeIcon={<UploadBigIcon />}
                      />
                    )}
                  </div>

                  <div className={styles.clientContent}>
                    <div className={styles.clientName}>{values.name}</div>
                    <div className={styles.textWrapper}>
                      <div className={styles.labelContent}>Last visit</div>
                      {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
                    </div>
                    <div className={styles.textWrapper}>
                      <div className={styles.labelContent}>Average bill</div>{' '}
                      {values.bills.length
                        ? Math.round(
                            values.bills.reduce((acc, num) => acc + num, 0) / values.bills.length,
                          )
                        : 'No bills'}
                    </div>
                    <div className={styles.textWrapper}>
                      <div className={styles.labelContent}>Status</div>
                      <StatusBar
                        getStatus={getStatus}
                        label=""
                        withoutGhost
                        oneStatus
                        prevStatuses={[values.status]}
                      />
                    </div>
                    <div className={styles.textWrapper}>
                      <div className={labelFixContent}>Phone number</div>
                      <Input
                        placeholder={values.phoneNumber ? values.phoneNumber : 'Enter phone number'}
                        className={styles.inputPhone}
                        containerClassName={styles.containerInput}
                      />
                    </div>
                    <div className={styles.textWrapper}>
                      <div className={labelFixContent}>Bill amount</div>
                      <div className={styles.billWrapper}>
                        <Input
                          className={styles.billInput}
                          containerClassName={styles.containerInputBill}
                          placeholder="Bill"
                          value={billValue}
                          onChange={(e) => setBillValue(e.target.value)}
                        />
                        <Button onClick={setBill} className={styles.modalBillButton}>
                          Enter
                        </Button>
                      </div>
                    </div>
                    {clientId && (
                      <div className={styles.textWrapper}>
                        <div className={labelFixContent}>Delete client</div>
                        <div className={styles.deleteClientWrapper}>
                          <Button
                            onClick={() => setOpenDeleteClient(true)}
                            className={styles.deleteClientButton}
                            outlined
                            orange
                            beforeIcon={<CrossIcon />}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
                <Button className={styles.submitButton} onClick={() => setOpenClientModal(false)}>
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

        <div className={styles.exisBackground}>
          <div className={styles.exisContainer}>
            {values.exisIds.length ? (
              <>
                {pinnedMessage && (
                  <div className={styles.pinnedExisWrapper}>
                    <div className={styles.pinnedMessageDateWrapper}>
                      <div className={styles.pinIconWrapper}>
                        <PinnedIcon />
                      </div>
                      <div className={styles.pinnedMessageDate}>
                        {new Date(pinnedMessage.date).toLocaleDateString()}
                      </div>
                    </div>
                    <button className={styles.unpinButton} onClick={() => pinExis('')}>
                      <PinnedIcon stroke="#fff" />
                      <div className={styles.labelUnpinButton}>Unpin this EXIS</div>
                    </button>

                    <div className={styles.pinnedMessageText}>{pinnedMessage.text}</div>
                  </div>
                )}
                <div className={exisWrapperClassnames}>
                  {/* {values.exises.map((exis) => (
                    <div className={styles.exisContentWrapper} key={exis.id}>
                      <div className={styles.messageDateWrapper}>
                        <div className={styles.messageDate}>
                          {new Date(exis.date).toLocaleDateString()}
                        </div>
                        <div className={styles.buttonsWrapper}>
                          <button onClick={() => pinExis(exis.id)}>
                            <PinnedIcon />
                          </button>
                          <button onClick={() => editExis(exis)}>
                            <EditIcon />
                          </button>
                          <button onClick={() => confirmDeleteExis(exis)}>
                            <CrossInSquareIcon />
                          </button>
                        </div>
                      </div>
                      <div className={styles.messageText}>{exis.text}</div>
                      <Modal
                        onClose={() => setOpenDeleteExis(false)}
                        open={isOpenDeleteExis}
                        className={styles.modalDeleteExis}
                        label="Delete EXIS"
                      >
                        <div className={styles.contentWrapperDeleteClientModal}>
                          <div className={styles.contentDeleteModal}>
                            Are you sure you want to delete this EXIS?
                          </div>
                          <div className={styles.deleteExisWrapper}>
                            <div className={styles.deleteExisDate}>
                              {deletingExis && new Date(deletingExis.date).toLocaleDateString()}
                            </div>
                            <div className={styles.deleteExisText}>{deletingExis?.text}</div>
                          </div>
                          <div className={styles.buttonWrapper}>
                            <Button
                              className={styles.cancelButton}
                              outlined
                              onClick={() => setOpenDeleteExis(false)}
                            >
                              Cancel
                            </Button>
                            <Button className={styles.logoutButton} onClick={deleteExis}>
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ))} */}
                </div>
              </>
            ) : (
              <div className={styles.noExis}>No EXIS</div>
            )}
            <div className={exisInputWrapperClassnames}>
              <div className={styles.horizontalLine} />
              {editingExis ? (
                <div className={styles.wrapperEdittingInpt}>
                  <div className={styles.labelEdittingInput}>
                    <EditIcon />
                    Editing
                  </div>
                  <div className={styles.editingExisText}>{editingExis.text}</div>
                  <Input
                    className={styles.exisEditInput}
                    value={editingExisStr}
                    onChange={(e) => setEditingExisStr(e.target.value)}
                    autoFocus
                  />
                  <Button
                    className={styles.exisSubmitEditButton}
                    beforeIcon={<SquareTickIcon />}
                    onClick={redactExis}
                  />
                  <button
                    onClick={() => setEditingExis(undefined)}
                    className={styles.buttonCloseEdit}
                  >
                    <CrossIcon />
                  </button>
                </div>
              ) : (
                <>
                  <Input
                    className={styles.exisInput}
                    placeholder="Enter EXIS"
                    value={newExisText}
                    onChange={(e) => setNewExisText(e.target.value)}
                  />
                  <Button
                    className={styles.exisSubmitButton}
                    beforeIcon={<AddExisIcon />}
                    onClick={addNewExis}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpenDeleteClient(false)}
        open={isOpenDeleteClient}
        className={styles.modalDeleteClient}
        label="Delete client"
      >
        <div className={styles.contentWrapperDeleteClientModal}>
          <div className={styles.contentDeleteModal}>
            Are you sure you want to delete the client?
          </div>
          <div className={styles.deleteClientInfoWrapper}>
            {/* <img
              src={values.imageLinks && values.imageLinks[values.imageLinks.length - 1]}
              alt={`avatar_${values.name}`}
              className={styles.deleteClientImg}
            /> */}
            <div className={styles.deleteClientDataWrapper}>
              <div className={styles.deleteClientName}>{values.name}</div>
              <div className={styles.deleteClientTextWrapper}>
                <div className={styles.deleteClientLabelContent}>Last visit</div>
                {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
              </div>
              <div className={styles.deleteClientTextWrapper}>
                <div className={styles.deleteClientLabelContent}>Average bill</div>
                {values.bills.length
                  ? Math.round(
                      values.bills.reduce((acc, num) => acc + num, 0) / values.bills.length,
                    )
                  : 'No bills'}
              </div>
              <div className={styles.deleteClientTextWrapper}>
                <div className={styles.deleteClientStatus}>{getDeleteIcon(values.status)}</div>
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
            <Button className={styles.logoutButton} onClick={() => setOpenDeleteClient(false)}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};
