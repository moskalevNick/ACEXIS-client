import React, { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WarningIcon } from '../Icons/WarningIcon';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { PinnedIcon } from '../Icons/PinnedIcon';
import styles from './Card.module.css';
import { getInterval } from '../../helpers/getInterval';
import {
  ClientType,
  CreateClientType,
  CreateImageType,
  SimilarType,
  UpdateClientType,
} from '../../types';
import { CLICK_DURATION } from '../../helpers/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { exisActions } from '../../redux/exis/actions';
import { visitActions } from '../../redux/visit/actions';
import { CrossIcon } from '../Icons/CrossIcon';
import { Button } from '../Button/Button';
import { clientActions } from '../../redux/clients/actions';
import { t } from 'i18next';
import { imagesActions } from '../../redux/images/actions';
import { Checkbox } from '../Checkbox/Checkbox';

type CardType = {
  client: ClientType;
  showInfo?: null | { id: string; x: number; y: number };
  setShowInfo: Dispatch<SetStateAction<{ id: string; x: number; y: number } | null>>;
  tickClient: (id: string) => void;
};

export const Card: React.FC<CardType> = ({ client, showInfo, setShowInfo, tickClient }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mouseDown, setMouseDown] = useState<Date>(new Date());
  const [isShortDescriptionVisible, setShortDescriptionVisible] = useState(false);
  const [isTickClient, setTickClient] = useState(false);

  const images = useAppSelector((state) => state.imageReducer.images[client.id]);
  const pinnedExis = useAppSelector((state) => state.exisReducer.pinnedExis[client.id]);
  const lastVisit = useAppSelector((state) => state.visitReducer.lastVisits[client.id]);

  const chooseIcon = (status: string) => {
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
      default:
        return <GhostStatusIcon />;
    }
  };

  const showSimilar = (ev: any) => {
    if (!showInfo || showInfo.id !== ev.id) {
      if (ev.view.innerWidth - ev.clientX < 600 && client.similar) {
        if (client.similar?.length > 1) {
          setShowInfo({ id: client.id, x: ev.clientX - 650, y: ev.clientY });
        } else {
          setShowInfo({ id: client.id, x: ev.clientX - 400, y: ev.clientY });
        }
      } else {
        setShowInfo({ id: client.id, x: ev.clientX, y: ev.clientY });
      }
    }
  };

  const closeShortDescription = (e: any) => {
    // FIXME: delete bobbling (maybe not actual)
    setShortDescriptionVisible(false);
  };

  const onMouseDown = () => {
    setMouseDown(new Date());
    dispatch(clientSettingsActions.setCurrentClient(client));
    dispatch(exisActions.getExises(client.id));
    dispatch(visitActions.getVisits(client.id));
  };

  const onMouseUp = () => {
    checkDelay(mouseDown, new Date());
  };

  const checkDelay = (down: Date, up: Date) => {
    const showShortDescription = Number(up) - Number(down) > CLICK_DURATION;

    if (showShortDescription) {
      setShortDescriptionVisible(true);
    } else {
      navigate(`/cloud/${client.id}`);
    }
  };

  const deleteSimilar = async (id: string) => {
    const response = await dispatch(clientActions.deleteSimilar(id));
    const deletedClient: any = response.payload;
    dispatch(clientActions.deleteSimilarImage(deletedClient.image.id));
  };

  const combineSimilar = (id: string) => {
    const currentSimilar: SimilarType | undefined = client.similar?.find((el) => el.id === id);
    if (client.face_id?.find((el) => el === currentSimilar?.face_id)) {
      dispatch(clientActions.deleteSimilar(id));
      currentSimilar && dispatch(clientActions.deleteSimilarImage(currentSimilar.image.id));
    } else if (currentSimilar) {
      const newFaces: string[] | undefined = Object.assign([], client.face_id);
      if (newFaces) {
        newFaces.push(currentSimilar.face_id);
      }
      if (client.images?.length) {
        const clientUpdateDto: UpdateClientType = {
          ...client,
          face_id: newFaces,
        };
        clientUpdateDto.id && delete clientUpdateDto.id;
        clientUpdateDto.exises && delete clientUpdateDto.exises;
        clientUpdateDto.images && delete clientUpdateDto.images;
        clientUpdateDto.similar && delete clientUpdateDto.similar;
        clientUpdateDto.visits && delete clientUpdateDto.visits;

        dispatch(
          clientActions.editClientWithoutUpdateRedux({
            id: client.id,
            newClient: clientUpdateDto,
          }),
        );

        dispatch(
          imagesActions.createImage({
            clientId: client.id,
            path: currentSimilar.image.path,
            publicUrl: currentSimilar.image.publicUrl,
          }),
        );
      }
      dispatch(clientActions.deleteSimilar(id));
    }
  };

  const addClient = async (id: string) => {
    const similar = client.similar?.find((el) => el.id === id);
    if (similar) {
      const newClientForServer: CreateClientType = {
        name: 'Unknown client',
        status: 'ghost',
        phone: '',
        face_id: [similar?.face_id],
        lastIdentified: client.lastIdentified,
      };

      const response = await dispatch(clientActions.addClient(newClientForServer));
      const newClient: any = await response.payload;

      const newClientImage: CreateImageType = {
        ...similar.image,
        clientId: newClient.id,
      };

      delete newClientImage.similarId;
      delete newClientImage.id;

      dispatch(imagesActions.createImage(newClientImage));
      dispatch(clientActions.deleteSimilar(id));
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.checkboxWrapper}>
          <Checkbox
            checked={isTickClient}
            className={styles.checkbox}
            onChange={() => {
              setTickClient((prev) => !prev);
              tickClient(client.id);
            }}
          />
        </div>
        <div
          className={styles.contentWrapper}
          onMouseDown={() => onMouseDown()}
          onMouseUp={onMouseUp}
        >
          <div className={styles.imgWrapper}>
            {images?.length > 0 && (
              <img src={images.at(-1)?.publicUrl} alt={`avatar_${images.at(-1)?.id}`} />
            )}
          </div>
          <div className={styles.name}>{client.name}</div>
          <div className={styles.lastVisit}>
            {lastVisit ? getInterval(lastVisit.date) : t('no_visits')}
          </div>
          {client.similar?.length !== 0 && (
            <div className={styles.coincidentWrapper}>
              <div className={styles.warningIconWrapper} onMouseEnter={showSimilar}>
                <WarningIcon fill="#FF5C00" interfill="#FFF5F0" opacity="1" />
              </div>
            </div>
          )}
        </div>

        <div className={styles.status} onMouseDown={() => onMouseDown()} onMouseUp={onMouseUp}>
          {chooseIcon(client.status)}
        </div>
        {isShortDescriptionVisible && (
          <div className={styles.shortDescriptionWrapper} onClick={closeShortDescription}>
            <div className={styles.shortDescription}>
              <div className={styles.nameClient}>{client.name}</div>
              <div className={styles.textWrapper}>
                <div className={styles.labelContent}>{t('last_visit')}</div>
                {lastVisit ? getInterval(lastVisit.date) : t('no_visits')}
              </div>
              <div className={styles.textWrapper}>
                <div className={styles.labelContent}>{t('average_bill')}</div>
                {client.averageBill || t('no_bills')}
              </div>
              {pinnedExis && (
                <>
                  <div className={styles.horizontalLineDescription} />
                  <div className={styles.pinnedMessageDateWrapper}>
                    <PinnedIcon />
                    <div className={styles.pinnedMessageDate}>
                      {new Date(pinnedExis.date).toLocaleDateString()}{' '}
                      {new Date(pinnedExis.date).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className={styles.pinnedMessageText}>{pinnedExis.text}</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {showInfo && showInfo.id === client.id && (
        <div
          className={styles.coincidentContainer}
          style={{ left: showInfo.x + 30, top: showInfo.y - 170 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.coincidentHeader}>{t('select_coincident_photo')}</div>
          <div className={styles.horizontalLineCoincident} />
          <div className={styles.profilesWrapper}>
            {client.similar?.map((el) => (
              <div className={styles.coincidentCard} key={el.id}>
                <div className={styles.imgCoincidentWrapper}>
                  {el.image && <img src={el.image.publicUrl} alt={`avatar_coincident_${el.id}`} />}
                  <button
                    className={styles.coincidentDeleteButton}
                    onClick={() => deleteSimilar(el.id)}
                  >
                    <CrossIcon />
                  </button>
                  <div className={styles.buttonsWrapper}>
                    <Button className={styles.actionButton} onClick={() => addClient(el.id)}>
                      {t('new_client')}
                    </Button>
                    <Button className={styles.actionButton} onClick={() => combineSimilar(el.id)}>
                      {t('combine')}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
