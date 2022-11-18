import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { Input } from '../Input/Input';
import { UploadBigIcon } from '../Icons/UploadBigIcon';
import { Button } from '../Button/Button';
import { StatusBar } from '../StatusBar/StatusBar';
import classNames from 'classnames';
import { CrossIcon } from '../Icons/CrossIcon';
import { SquareUploadIcon } from '../Icons/SquareUploadIcon';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, ImageType, VisitsType } from '../../redux/types';
import { ImageWrapper } from '../ImageWrapper/ImageWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { imagesActions } from '../../redux/images/actions';
import { Loader } from '../Loader/Loader';
import { clientActions } from '../../redux/clients/actions';

type ClientDataContainerType = {
  lastVisit: VisitsType | null;
  client: ClientType;
  isNew: boolean;
  setOpenDeleteClient: (state: boolean) => void;
  setClientAvatar: (state: ImageType | null) => void;
  clientAvatar: ImageType | null;
  updateFormData: (state: any) => void;
};

export const ClientDataContainer: React.FC<ClientDataContainerType> = ({
  lastVisit,
  client,
  isNew,
  setOpenDeleteClient,
  setClientAvatar,
  clientAvatar,
  updateFormData,
}) => {
  const dispatch = useAppDispatch();
  const [clientPhotoGallery, setClientPhotoGallery] = useState<ImageType[]>([]);
  const [billValue, setBillValue] = useState<string>('');
  const [phoneInputStr, setPhoneInputStr] = useState<string>('');
  const [bills, setBills] = useState<number[]>([]);
  const [status, setStatus] = useState<string>(client.status);

  const storeImages = useAppSelector((state) => state.imageReducer.images);
  const isLoading = useAppSelector((state) => state.imageReducer.isLoading);
  const newClient = useAppSelector((state) => state.clientReducer.newClient);

  useEffect(() => {
    updateFormData({ status, bills, phoneInputStr });
  }, [status, bills, phoneInputStr]);

  useEffect(() => {
    if (client.id) {
      dispatch(imagesActions.getImages(client.id));
    }
    if (client.phone) {
      setPhoneInputStr(client.phone);
    }
    if (client.bills) {
      setBills(client.bills);
    }
    if (!client) {
      setClientAvatar(null);
      setClientPhotoGallery([]);
    }
  }, [client.id, dispatch, setClientAvatar]);

  useEffect(() => {
    if (storeImages?.length !== 0) {
      const imageGallery: ImageType[] = [];
      storeImages?.forEach((image, i, array) => {
        if (i === array.length - 1) {
          setClientAvatar(image);
        } else {
          imageGallery.push(image);
        }
      });
      setClientPhotoGallery(imageGallery.reverse());
    } else {
      setClientPhotoGallery([]);
      setClientAvatar(null);
    }
  }, [storeImages, setClientAvatar]);

  const addBill = () => {
    if (billValue) {
      setBills((prev) => [...prev, Number(billValue)]);
    }
    setBillValue('');
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (client.id) {
        dispatch(imagesActions.uploadImage({ clientId: client.id, image: event.target.files[0] }));
      } else if (newClient?.id) {
        dispatch(
          imagesActions.uploadImage({ clientId: newClient.id, image: event.target.files[0] }),
        );
      }
    }
  };

  const deleteAvatar = () => {
    if (clientAvatar) {
      dispatch(imagesActions.deleteImage(clientAvatar.id));
    }
  };

  const getStatus = (status: string[]) => {
    setStatus(status[0]);
  };

  const labelFixContent = classNames(styles.labelContent, styles.labelFixContent);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.clientData}>
      <div className={styles.uploadPhotoWrapper}>
        {clientAvatar ? (
          <div className={styles.photosWrapper}>
            <div className={styles.avatarPhoto}>
              <button className={styles.removePhotoButton} onClick={deleteAvatar}>
                <CrossIcon />
              </button>
              <ImageWrapper
                src={clientAvatar.publicUrl}
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
                      src={photo.publicUrl}
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
          <div className={styles.labelContent}>Average bill</div>
          {bills?.length
            ? Math.round(bills.reduce((acc, num) => acc + num, 0) / bills.length)
            : 'No bills'}
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>Status</div>
          <StatusBar
            getStatus={getStatus}
            label=""
            withoutGhost={!isNew}
            oneStatus
            prevStatuses={[client.status]}
          />
        </div>
        <div className={styles.textWrapper}>
          <div className={labelFixContent}>Phone number</div>
          <Input
            placeholder={'Enter phone number'}
            className={styles.inputPhone}
            containerClassName={styles.containerInput}
            value={phoneInputStr}
            onChange={(e) => setPhoneInputStr(e.target.value)}
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
              type="number"
              onChange={(e) => setBillValue(e.target.value)}
            />
            <Button onClick={addBill} className={styles.modalBillButton}>
              Enter
            </Button>
          </div>
        </div>
        {!isNew && (
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
