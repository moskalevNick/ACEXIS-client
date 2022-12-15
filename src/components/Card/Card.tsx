import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
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
import { ClientType, SimilarType, UpdateClientType, VisitsType } from '../../types';
import { CLICK_DURATION } from '../../helpers/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { exisActions } from '../../redux/exis/actions';
import { visitActions } from '../../redux/visit/actions';
import { CrossIcon } from '../Icons/CrossIcon';
import { Button } from '../Button/Button';
import { clientActions } from '../../redux/clients/actions';
type CardType = {
  client: ClientType;
  showInfo?: null | { id: string; x: number; y: number };
  setShowInfo: Dispatch<SetStateAction<{ id: string; x: number; y: number } | null>>;
};

export const Card: React.FC<CardType> = ({ client, showInfo, setShowInfo }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mouseDown, setMouseDown] = useState<Date>(new Date());
  const [isShortDescriptionVisible, setShortDescriptionVisible] = useState(false);

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

  const closeShortDescription = (e: any) => {
    // FIXME: delete bobbling
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

  const deleteSimilar = (id: string) => {
    dispatch(clientActions.deleteSimilar(id));
  };

  useEffect(() => {
    if (client.similar) {
      client.similar.forEach((similar) => {
        if (!similar.image) {
          dispatch(clientActions.deleteSimilar(similar.id));
        }
      });
    }
  }, [client]);

  const combineSimilar = (id: string) => {
    const currentFaceId: string | undefined = client.similar?.find((el) => el.id === id)?.face_id;
    if (client.face_id?.find((el) => el === currentFaceId)) {
      dispatch(clientActions.deleteSimilar(id));
    } else if (currentFaceId) {
      const newFaces: string[] | undefined = Object.assign([], client.face_id);
      if (newFaces) {
        newFaces.push(currentFaceId);
      }
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
        clientActions.editClient({
          id: client.id,
          newClient: clientUpdateDto,
        }),
      );
      dispatch(clientActions.deleteSimilar(id));
    }
  };

  return (
    <>
      <div className={styles.wrapper} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <div className={styles.contentWrapper}>
          <div className={styles.imgWrapper}>
            {images.length > 0 && (
              <img src={images.at(-1)?.publicUrl} alt={`avatar_${images.at(-1)?.id}`} />
            )}
          </div>
          <div className={styles.name}>{client.name ? client.name : 'Unknown client'}</div>
          <div className={styles.lastVisit}>
            {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
          </div>
          {client.similar?.length !== 0 && (
            <div className={styles.coincidentWrapper}>
              <div
                className={styles.warningIconWrapper}
                onMouseEnter={(ev) =>
                  !showInfo && setShowInfo({ id: client.id, x: ev.clientX, y: ev.clientY })
                }
              >
                <WarningIcon fill="#FF5C00" interfill="#FFF5F0" opacity="1" />
              </div>
            </div>
          )}
        </div>

        <div className={styles.status}>{chooseIcon(client.status)}</div>
        {isShortDescriptionVisible && (
          <div className={styles.shortDescriptionWrapper} onClick={closeShortDescription}>
            <div className={styles.shortDescription}>
              <div className={styles.nameClient}>{client.name}</div>
              <div className={styles.textWrapper}>
                <div className={styles.labelContent}>Last visit</div>
                {lastVisit ? getInterval(lastVisit.date) : 'No visits'}
              </div>
              <div className={styles.textWrapper}>
                <div className={styles.labelContent}>Average bill</div>
                {client.averageBill || 'no bills'}
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
          <div className={styles.coincidentHeader}>Select coincident photo</div>
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
                  <Button className={styles.combainButton} onClick={() => combineSimilar(el.id)}>
                    Combine
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
