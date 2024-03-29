import styles from './ClientCard.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import { Input } from '../Input/Input';
import { UploadBigIcon } from '../Icons/UploadBigIcon';
import { Button } from '../Button/Button';
import { StatusBar } from '../StatusBar/StatusBar';
import classNames from 'classnames';
import { CrossIcon } from '../Icons/CrossIcon';
import { SquareUploadIcon } from '../Icons/SquareUploadIcon';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, ImageType } from '../../types';
import { ImageWrapper } from '../ImageWrapper/ImageWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { imagesActions } from '../../redux/images/actions';
import { useParams } from 'react-router-dom';
import i18next, { t } from 'i18next';
import { UploadBigIconRus } from '../Icons/UploadBigIconRus';
import { Checkbox } from '../Checkbox/Checkbox';

type ClientDataContainerType = {
  clientImages: ImageType[] | [];
  clientAvatar: ImageType | null;
  client: ClientType;
  setOpenDeleteClient: (state: boolean) => void;
  updateFormData: (state: any) => void;
};

export const ClientDataContainer: React.FC<ClientDataContainerType> = ({
  client,
  setOpenDeleteClient,
  clientImages,
  clientAvatar,
  updateFormData,
}) => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const [billValue, setBillValue] = useState<string>('');
  const [phoneInputStr, setPhoneInputStr] = useState<string>(client.phone);
  const [averageBill, setAverageBill] = useState<number>(client.averageBill || 0);
  const [billsAmount, setBillsAmount] = useState<number>(client.billsAmount || 0);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [isAddFaces, setIsAddFaces] = useState<boolean>(client.isAddFaces || true);
  const [status, setStatus] = useState<string>(client.status);

  const lastVisit = useAppSelector((state) => state.visitReducer.lastVisits[client.id]);

  useEffect(() => {
    if (client.isAddFaces !== null && client.isAddFaces !== undefined) {
      setIsAddFaces(client.isAddFaces);
    } else {
      setIsAddFaces(true);
    }
  }, [client.isAddFaces]);

  useEffect(() => {
    if (id === 'new') {
      setIsNew(true);
    } else setIsNew(false);
  }, [id]);

  useEffect(() => {
    updateFormData({ status, averageBill, billsAmount, phoneInputStr, isAddFaces });
    // eslint-disable-next-line
  }, [status, averageBill, billsAmount, phoneInputStr, isAddFaces]);

  const addBill = () => {
    if (billValue) {
      if (!isNaN(Number(billValue))) {
        setAverageBill((prev) => prev + Number(billValue) / (billsAmount + 1));
        setBillsAmount((prev) => prev + 1);
      }
    }
    setBillValue('');
  };

  const { avatarImage, imageGalery } = useMemo(() => {
    return {
      avatarImage: clientAvatar && (
        <ImageWrapper
          src={clientAvatar.publicUrl}
          alt={`avatar_${clientAvatar.id}`}
          className={styles.img}
          effect="opacity"
        />
      ),
      imageGalery:
        clientImages.length > 0 &&
        // eslint-disable-next-line
        clientImages.map((photo, i, arr) => {
          if (i !== arr.length - 1)
            return (
              <div className={styles.smallPhotoWrapper} key={`${photo}_${i}`}>
                <ImageWrapper
                  src={photo.publicUrl}
                  alt={`small_photo_${i}_${photo}`}
                  className={styles.smallImg}
                  effect="opacity"
                />
              </div>
            );
        }),
    };
  }, [clientImages, clientAvatar]);

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      dispatch(imagesActions.uploadImage({ clientId: client.id, image: event.target.files[0] }));
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

  return (
    <div className={styles.clientData}>
      <div className={styles.uploadPhotoWrapper}>
        {clientAvatar ? (
          <div className={styles.photosWrapper}>
            <div className={styles.avatarPhoto}>
              <button className={styles.removePhotoButton} onClick={deleteAvatar}>
                <CrossIcon />
              </button>
              {avatarImage}
            </div>
            <div className={styles.photoGallery}>
              {imageGalery}

              {imageGalery && imageGalery.length < 5 && (
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
            <div className={styles.stopRecognitionContainer}>
              <div className={labelFixContent}>{t('propose_new_faces')}</div>
              <div className={styles.billWrapper}>
                <Checkbox checked={isAddFaces} onChange={() => setIsAddFaces((prev) => !prev)} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <input className={styles.uploadButton} type="file" onChange={uploadImage} />
            {i18next.resolvedLanguage === 'ru' ? <UploadBigIconRus /> : <UploadBigIcon />}
          </>
        )}
      </div>

      <div className={styles.clientContent}>
        <div className={styles.clientName}>{client.name}</div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>{t('last_visit')}</div>
          {lastVisit ? getInterval(lastVisit.date) : t('no_visits')}
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>{t('average_bill')}</div>
          {Math.round(averageBill) || t('no_bills')}
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.labelContent}>{t('status')}</div>
          <StatusBar
            getStatus={getStatus}
            label=""
            withoutGhost={!isNew}
            oneStatus
            prevStatuses={[client.status]}
          />
        </div>
        <div className={styles.textWrapper}>
          <div className={labelFixContent}>{t('phone_number')}</div>
          <Input
            placeholder={t('enter_phone_number') as string}
            className={styles.inputPhone}
            containerClassName={styles.containerInput}
            value={phoneInputStr}
            onChange={(e) => setPhoneInputStr(e.target.value)}
          />
        </div>
        <div className={styles.textWrapper}>
          <div className={labelFixContent}>{t('bill_amount')}</div>
          <div className={styles.billWrapper}>
            <Input
              className={styles.billInput}
              containerClassName={styles.containerInputBill}
              placeholder={t('bill2') as string}
              value={billValue}
              onChange={(e) => setBillValue(e.target.value)}
            />
            <Button onClick={addBill} className={styles.modalBillButton}>
              {t('enter')}
            </Button>
          </div>
        </div>
        {!isNew && (
          <div className={styles.textWrapper}>
            <div className={labelFixContent}>{t('delete_client')}</div>
            <div className={styles.deleteClientWrapper}>
              <Button
                onClick={() => setOpenDeleteClient(true)}
                className={styles.deleteClientButton}
                outlined
                orange
                beforeIcon={<CrossIcon />}
              >
                {t('delete')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
