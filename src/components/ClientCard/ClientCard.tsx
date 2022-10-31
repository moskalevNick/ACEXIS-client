import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { UploadBigIcon } from '../Icons/UploadBigIcon';
import { Button } from '../Button/Button';
import { StatusBar } from '../StatusBar/StatusBar';
import { AddExisIcon } from '../Icons/AddExisIcon';
import { ClientType, ExisType } from '../../modules/TodayModule/TodayModule';
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

type ClientCardType = {
  isOpenClientModal: boolean;
  setOpenClientModal: (state: boolean) => void;
  clientData?: ClientType;
};

const defaultValues: ClientType = {
  imgPath: [],
  name: 'Client name',
  lastVisit: 'No Visits',
  status: 'ghost',
  isSimilar: false,
  id: '1',
  exises: [],
  visits: [],
};

export const ClientCard: React.FC<ClientCardType> = ({
  isOpenClientModal,
  setOpenClientModal,
  clientData,
}) => {
  const [billValue, setBillValue] = useState('');
  const [values, setValues] = useState<ClientType>(defaultValues);
  const [isVisits, toggleVisits] = useState(false);
  const [isOpenDeleteClient, setOpenDeleteClient] = useState(false);
  const [isOpenDeleteExis, setOpenDeleteExis] = useState(false);
  const [deletingExis, setDeletingExis] = useState<ExisType | undefined>();
  const [pinnedMessage, setPinnedMessage] = useState<ExisType>();

  const setBill = () => {
    //console.log(billValue);
  };

  const getStatus = (status: string[]) => {
    // console.log(status);
  };

  useEffect(() => {
    if (clientData) {
      setValues(clientData);
    }
  }, [clientData]);

  useEffect(() => {
    const pinnedMessage = values.exises.find((el) => el.id === values.pinnedExisId);
    pinnedMessage && setPinnedMessage(pinnedMessage);
  }, [values.pinnedExisId]);

  const getInterval = (date: Date) => {
    const interval = Number(new Date().setHours(0, 0, 0, 0)) / 86400000 - Number(date) / 86400000;
    if (interval === 0) {
      return 'Today';
    }
    if (interval === 1) {
      return 'Yesterday';
    }
    if (interval < 60) {
      return `${interval} days ago`;
    }
    if (Math.floor(interval / 30) === 6) {
      return 'Half a year ago';
    }
    if (interval < 365) {
      return `${Math.floor(interval / 30)} months ago`;
    }
    if (Math.floor(interval / 30) === 12) {
      return 'A year ago';
    }
    return 'Over a year ago';
  };

  const settingsClassnames = classNames(styles.section, !isVisits && styles.activeSection);
  const visitsClassnames = classNames(styles.section, isVisits && styles.activeSection);
  const labelFixContent = classNames(styles.labelContent, styles.labelFixContent);
  const exisWrapperClassnames = classNames(
    styles.exisesWrapper,
    pinnedMessage && styles.exisesWrapperWithPin,
  );

  const [position, setPosition] = useState<any>({ positionX: 320 });

  const onDrag = (data: DraggableData) => {
    setPosition({ positionX: data.x });
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

  clientData?.exises.sort((a, b) => -Number(a.date) + Number(b.date));

  const deleteExis = (exis: ExisType) => {
    setOpenDeleteExis(true);
    setDeletingExis(exis);
  };

  return (
    <Modal
      onClose={() => setOpenClientModal(false)}
      open={isOpenClientModal}
      className={styles.modalClient}
    >
      {clientData ? (
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
            {clientData && (
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
                    <div className={styles.visitsContainer}>
                      {values.visits.map((el) => (
                        <div key={el.date.toString()} className={styles.visitItemWrapper}>
                          <div className={styles.visitItem}>
                            <div className={styles.interval}>{getInterval(el.date)}</div>
                          </div>
                          <div className={styles.visitItem}>
                            <div className={styles.visitDate}>{el.date.toLocaleDateString()}</div>
                          </div>
                          <div className={styles.visitItem}>
                            <div className={styles.exisPointWrapper}>
                              {el.exisId && (
                                <>
                                  <div className={styles.exisPoint} />
                                  <div className={styles.exisBadge}>
                                    <div className={styles.exisBadgeTime}>
                                      {values.exises
                                        .find((exis) => exis.id === el.exisId)
                                        ?.date.toLocaleDateString()}
                                    </div>
                                    <div className={styles.exisBadgeText}>
                                      {values.exises.find((exis) => exis.id === el.exisId)?.text}
                                    </div>
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
                    {values.imgPath.length ? (
                      <div className={styles.photosWrapper}>
                        <div className={styles.avatarPhoto}>
                          <button className={styles.removePhotoButton}>
                            <CrossIcon />
                          </button>
                          <img
                            src={values.imgPath[0]}
                            alt={`avatar_${values.name}`}
                            className={styles.img}
                          />
                        </div>
                        <div className={styles.photoGallery}>
                          {values.imgPath.map(
                            (el, i) =>
                              i !== 0 && (
                                <div className={styles.smallPhotoWrapper} key={`${el} ${i}`}>
                                  <img
                                    src={el}
                                    alt={`small_photo_${i}_${el}`}
                                    className={styles.smallImg}
                                  />
                                </div>
                              ),
                          )}
                          {values.imgPath.length < 5 && (
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
                      {values.lastVisit}
                    </div>
                    <div className={styles.textWrapper}>
                      <div className={styles.labelContent}>Average bill</div>
                      {values.averageBill ? values.averageBill : 'No bills'}
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
                    {clientData && (
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
                  {clientData ? 'Save' : 'Add visitor'}
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
            {values.exises.length ? (
              <>
                {pinnedMessage && (
                  <div className={styles.pinnedExisWrapper}>
                    <div className={styles.pinnedMessageDateWrapper}>
                      <div className={styles.pinIconWrapper}>
                        <PinnedIcon />
                      </div>
                      <div className={styles.pinnedMessageDate}>
                        {pinnedMessage.date.toLocaleDateString()}
                      </div>
                    </div>
                    <button className={styles.unpinButton} onClick={() => console.log('unpin')}>
                      <PinnedIcon stroke="#fff" />
                      <div className={styles.labelUnpinButton}>Unpin this EXIS</div>
                    </button>

                    <div className={styles.pinnedMessageText}>{pinnedMessage.text}</div>
                  </div>
                )}
                <div className={exisWrapperClassnames}>
                  {values.exises.map((exis) => (
                    <div className={styles.exisContentWrapper} key={exis.id}>
                      <div className={styles.messageDateWrapper}>
                        <div className={styles.messageDate}>{exis.date.toLocaleDateString()}</div>
                        <div className={styles.buttonsWrapper}>
                          <button>
                            <PinnedIcon />
                          </button>
                          <button>
                            <EditIcon />
                          </button>
                          <button onClick={() => deleteExis(exis)}>
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
                              {deletingExis?.date.toLocaleDateString()}
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
                            <Button
                              className={styles.logoutButton}
                              onClick={() => setOpenDeleteExis(false)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.noExis}>No EXIS</div>
            )}
            <div className={styles.exisInputWrapper}>
              <div className={styles.horizontalLine} />
              <Input className={styles.exisInput} placeholder="Enter EXIS" />
              <Button className={styles.exisSubmitButton} beforeIcon={<AddExisIcon />} />
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
            <img
              src={values.imgPath[0]}
              alt={`avatar_${values.name}`}
              className={styles.deleteClientImg}
            />
            <div className={styles.deleteClientDataWrapper}>
              <div className={styles.deleteClientName}>{values.name}</div>
              <div className={styles.deleteClientTextWrapper}>
                <div className={styles.deleteClientLabelContent}>Last visit</div>
                {values.lastVisit}
              </div>
              <div className={styles.deleteClientTextWrapper}>
                <div className={styles.deleteClientLabelContent}>Average bill</div>
                {values.averageBill ? values.averageBill : 'No bills'}
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
