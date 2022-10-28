import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Input } from '../Input/Input';
import { UploadBigIcon } from '../Icons/UploadBigIcon';
import { Button } from '../Button/Button';
import { StatusBar } from '../StatusBar/StatusBar';
import { AddExisIcon } from '../Icons/AddExisIcon';
import { ClientType } from '../../modules/TodayModule/TodayModule';
import classNames from 'classnames';
import { CrossIcon } from '../Icons/CrossIcon';
import { SquareUploadIcon } from '../Icons/SquareUploadIcon';
import { PinnedIcon } from '../Icons/PinnedIcon';

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
};

export const ClientCard: React.FC<ClientCardType> = ({
  isOpenClientModal,
  setOpenClientModal,
  clientData,
}) => {
  const [billValue, setBillValue] = useState('');
  const [values, setValues] = useState<ClientType>(defaultValues);
  const [isVisits, toggleVisits] = useState(false);

  useEffect(() => {
    if (clientData) {
      setValues(clientData);
    }
  }, [clientData]);

  const setBill = () => {
    //console.log(billValue);
  };

  const getStatus = (status: string[]) => {
    // console.log(status);
  };

  const settingsClassnames = classNames(styles.section, !isVisits && styles.activeSection);
  const visitsClassnames = classNames(styles.section, isVisits && styles.activeSection);
  const labelFixContent = classNames(styles.labelContent, styles.labelFixContent);

  return (
    <Modal
      onClose={() => setOpenClientModal(false)}
      open={isOpenClientModal}
      className={styles.modalAddClient}
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
                      {values.imgPath.map((el, i) => {
                        if (i !== 0) {
                          return (
                            <div className={styles.smallPhotoWrapper} key={`${el} ${i}`}>
                              <img
                                src={el}
                                alt={`small_photo_${i}_${el}`}
                                className={styles.smallImg}
                              />
                            </div>
                          );
                        } else return;
                      })}
                      {values.imgPath.length < 5 && (
                        <button className={styles.smallUploadButtonWrapper}>
                          <SquareUploadIcon />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <Button className={styles.uploadButton} outlined beforeIcon={<UploadBigIcon />} />
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
                        onClick={setBill}
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
          </div>

          <div>
            <div className={styles.horizontalLine} />
            <div className={styles.submitButtonsWrapper}>
              <Button outlined className={styles.submitButton}>
                Cancel
              </Button>
              <Button className={styles.submitButton}>{clientData ? 'Save' : 'Add visitor'}</Button>
            </div>
          </div>
        </div>

        <div className={styles.exisBackground}>
          <div className={styles.exisContainer}>
            <>
              {values.exises.length ? (
                <>
                  {values.pinnedExis && (
                    <div className={styles.pinnedExisWrapper}>
                      <div className={styles.pinnedMessageDateWrapper}>
                        <div className={styles.pinIconWrapper}>
                          <PinnedIcon />
                        </div>
                        <div className={styles.pinnedMessageDate}>
                          {`${values.pinnedExis?.date?.getDate()}.${
                            values.pinnedExis?.date?.getMonth() + 1 < 10
                              ? `0${values.pinnedExis?.date?.getMonth() + 1}`
                              : values.pinnedExis?.date?.getMonth() + 1
                          }.${values.pinnedExis?.date?.getFullYear()}`}
                        </div>
                      </div>
                      <button className={styles.unpinButton}>
                        <PinnedIcon />
                        Unpin this EXIS
                      </button>

                      <div className={styles.pinnedMessageText}>{values.pinnedExis?.text}</div>
                    </div>
                  )}
                  <div className={styles.exisesWrapper}>
                    {values.exises.map((exis) => (
                      <div className={styles.exisContentWrapper} key={exis.text}>
                        <div className={styles.messageDateWrapper}>
                          <div className={styles.messageDate}>
                            {`${exis?.date?.getDate()}.${
                              exis?.date?.getMonth() + 1 < 10
                                ? `0${exis?.date?.getMonth() + 1}`
                                : exis?.date?.getMonth() + 1
                            }.${exis?.date?.getFullYear()}`}
                          </div>
                        </div>
                        <div className={styles.messageText}>{exis.text}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.noExis}>No EXIS</div>
              )}
            </>
            <div className={styles.exisInputWrapper}>
              <div className={styles.horizontalLine} />
              <Input className={styles.exisInput} placeholder="Enter EXIS" />
              <Button className={styles.exisSubmitButton} beforeIcon={<AddExisIcon />} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
