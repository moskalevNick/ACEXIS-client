import styles from './ClientCard.module.css';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { UploadBigIcon } from '../Icons/UploadBigIcon';
import { Button } from '../Button/Button';
import { StatusBar } from '../StatusBar/StatusBar';
import classNames from 'classnames';
import { CrossIcon } from '../Icons/CrossIcon';
import { SquareUploadIcon } from '../Icons/SquareUploadIcon';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, VisitsType } from '../../redux/types';
import { ImageWrapper } from '../ImageWrapper/ImageWrapper';

type ClientDataContainerType = {
  lastVisit: VisitsType | null;
  client: ClientType;
  isDefault: boolean;
  setOpenDeleteClient: (state: boolean) => void;
};

export const ClientDataContainer: React.FC<ClientDataContainerType> = ({
  lastVisit,
  client,
  isDefault,
  setOpenDeleteClient,
}) => {
  const [clientAvatar, setClientAvatar] = useState<string | null>(null);
  const [clientPhotoGallery, setClientPhotoGallery] = useState<string[]>([]);
  const [billValue, setBillValue] = useState('');

  const setBill = () => {
    //console.log(billValue);
  };

  const getStatus = (status: string[]) => {
    // console.log(status);
  };

  useEffect(() => {
    if (client.images?.length !== 0) {
      client.images?.forEach((image, i, array) => {
        if (i === array.length - 1) {
          setClientAvatar(image.publicUrl);
        } else setClientPhotoGallery((prev) => [...prev, image.publicUrl]);
      });
    }
  }, [client]);

  useEffect(() => {
    return resetState();
  }, []);

  const resetState = () => {
    setClientAvatar(null);
    setClientPhotoGallery([]);
  };

  const uploadImage = (event: any) => {
    console.log(event.target.files[0]);
  };

  const labelFixContent = classNames(styles.labelContent, styles.labelFixContent);

  return (
    <div className={styles.clientData}>
      <div className={styles.uploadPhotoWrapper}>
        {clientAvatar ? (
          <div className={styles.photosWrapper}>
            <div className={styles.avatarPhoto}>
              <button className={styles.removePhotoButton}>
                <CrossIcon />
              </button>
              <ImageWrapper
                src={clientAvatar}
                alt={`avatar_${client.name}`}
                className={styles.img}
                effect="opacity"
              />
            </div>
            <div className={styles.photoGallery}>
              {clientPhotoGallery?.length !== 0 &&
                clientPhotoGallery?.map((photo, i) => (
                  <div className={styles.smallPhotoWrapper} key={`${photo}_${i}`}>
                    <ImageWrapper
                      src={photo}
                      alt={`small_photo_${i}_${photo}`}
                      className={styles.smallImg}
                      effect="opacity"
                    />
                  </div>
                ))}
              {clientPhotoGallery && clientPhotoGallery.length < 4 && (
                <div>
                  <input
                    className={styles.smallUploadButtonWrapper}
                    type="file"
                    onChange={uploadImage}
                  />
                  <SquareUploadIcon />
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <input className={styles.uploadButton} type="file" onChange={uploadImage} />
            <UploadBigIcon />
          </>
        )}
      </div>

      <div className={styles.clientContent}>
        <div className={styles.clientName}>{client.name}</div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>Last visit</div>
          {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>Average bill</div>{' '}
          {client.bills?.length
            ? Math.round(client.bills.reduce((acc, num) => acc + num, 0) / client.bills.length)
            : 'No bills'}
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>Status</div>
          <StatusBar
            getStatus={getStatus}
            label=""
            withoutGhost
            oneStatus
            prevStatuses={[client.status]}
          />
        </div>
        <div className={styles.textWrapper}>
          <div className={labelFixContent}>Phone number</div>
          <Input
            placeholder={client.phone ? client.phone : 'Enter phone number'}
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
        {isDefault && (
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
  );
};
