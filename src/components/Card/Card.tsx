import React, { useEffect, useState, MouseEvent, useCallback } from 'react';
import { WarninIcon } from '../Icons/WarningIcon';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { PinnedIcon } from '../Icons/PinnedIcon';
import { ClientCard } from '../ClientCard/ClientCard';
import { CrossIcon } from '../Icons/CrossIcon';
import { Button } from '../Button/Button';
import uuid from 'react-uuid';
import styles from './Card.module.css';
import { getInterval } from '../../helpers/getInterval';
import { ClientType, ExisType, VisitsType } from '../../redux/types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { imageSettingsActions } from '../../redux/images/reducers';
import { clientSettingsActions } from '../../redux/clients/reducers';

type CardType = {
  client: ClientType;
  clients: ClientType[];
  showInfo?: null | { id: string; x: number; y: number };
  setShowInfo: (val: null | { id: string; x: number; y: number }) => void;
};

const CLICK_DURATION = 2500; // in ms

export const Card: React.FC<CardType> = ({ client, clients, showInfo, setShowInfo }) => {
  const dispatch = useAppDispatch();
  const [mouseDown, setMouseDown] = useState<Date | undefined>();
  const [downTarget, setDownTarget] = useState<EventTarget>();
  const [isShortDescription, setShortDescription] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [pinnedMessage, setPinnedMessage] = useState<ExisType>();
  const [coincidentClients, setCoincidentClients] = useState<ClientType[]>([]);
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [clientAvatar, setClientAvatar] = useState<string | null>(null);

  // useEffect(() => {
  //   if (client.coincidentIds) {
  //     let arr: ClientType[] = [];
  //     client.coincidentIds.forEach((elem) => {
  //       const coincidentClient = clients.find((el) => el.id === elem);
  //       if (coincidentClient) arr.push(coincidentClient);
  //     });
  //     setCoincidentClients(arr);
  //   }
  // }, [client.coincidentIds]);

  useEffect(() => {
    if (client.images?.length) {
      setClientAvatar(client.images[client.images.length - 1].publicUrl);
    }
  }, [client]);

  useEffect(() => {
    if (client?.visits) {
      let latest: VisitsType | undefined;

      client.visits.forEach((el) => {
        if (Number(el.date) > (Number(latest?.date) || 0)) {
          latest = el;
        }
      });

      if ((latest && lastVisit && latest.date > lastVisit.date) || (!lastVisit && latest)) {
        setLastVisit(latest);
      }
    }
  }, [client.visits]);

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

  const onMouseDown = useCallback((ev: MouseEvent<HTMLElement>): void => {
    setDownTarget(ev.target);
    setMouseDown(new Date());
  }, []);

  const checkDelay = useCallback(
    (down: Date | undefined, up: Date) => {
      if (!openDescription && downTarget) {
        setShortDescription(Number(up) - Number(down) > CLICK_DURATION);
        setOpenDescription(true);
      } else {
        setOpenDescription(false);
      }
      setMouseDown(undefined);
    },
    [openDescription, downTarget],
  );

  useEffect(() => {
    if (!openDescription) {
      dispatch(imageSettingsActions.clearState());
      dispatch(clientSettingsActions.clearClient());
    }
  }, [openDescription]);

  return (
    <>
      <div
        className={styles.wrapper}
        onMouseDown={onMouseDown}
        onMouseUp={() => !openDescription && checkDelay(mouseDown, new Date())}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.imgWrapper}>
            {clientAvatar && <img src={clientAvatar} alt={`avatar_${client.name}`} />}
          </div>
          <div className={styles.name}>{client.name ? client.name : 'Unknown client'}</div>
          <div className={styles.lastVisit}>
            {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
          </div>
          {/* {client.coincidentIds?.length !== 0 && (
            <div className={styles.coincidentWrapper}>
              <div
                className={styles.warningIconWrapper}
                onMouseEnter={(ev) =>
                  !showInfo && setShowInfo({ id: client.id, x: ev.clientX, y: ev.clientY })
                }
              >
                <WarninIcon fill="#FF5C00" interfill="#FFF5F0" opacity="1" />
              </div>
            </div>
          )} */}
        </div>
        <div className={styles.status}>{chooseIcon(client.status)}</div>
        {openDescription &&
          (isShortDescription ? (
            <div
              className={styles.shortDescriptionWrapper}
              onClick={() => {
                setOpenDescription(false);
                setShortDescription(false);
                setDownTarget(undefined);
              }}
            >
              <div className={styles.shortDescription}>
                <div className={styles.nameClient}>{client.name}</div>
                <div className={styles.textWrapper}>
                  <div className={styles.labelContent}>Last visit</div>
                  {lastVisit ? getInterval(lastVisit.date) : 'No visits'}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.labelContent}>Average bill</div>
                  {client.bills?.length
                    ? Math.round(
                        client.bills.reduce((acc, num) => acc + num, 0) / client.bills.length,
                      )
                    : 'No bills'}
                </div>
                {pinnedMessage && (
                  <>
                    <div className={styles.horizontalLineDescription} />
                    <div className={styles.pinnedMessageDateWrapper}>
                      <PinnedIcon />
                      <div className={styles.pinnedMessageDate}>
                        {new Date(pinnedMessage.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className={styles.pinnedMessageText}>{pinnedMessage.text}</div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <ClientCard
              clientId={client.id}
              isOpenClientModal={openDescription}
              setOpenClientModal={setOpenDescription}
            />
          ))}
      </div>
      {showInfo && showInfo.id === client.id && (
        <div
          className={styles.coincidentContainer}
          style={{ left: showInfo.x + 30, top: showInfo.y - 170 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={styles.coincidentHeader}>Select coincident profile</div>
          <div className={styles.horizontalLineCoincident} />
          <div className={styles.profilesWrapper}>
            {/* {coincidentClients.map((el) => (
              <div className={styles.coincidentCard} key={uuid()}>
                <div className={styles.imgCoincidentWrapper}>
                  <img src={el.avatarLink} alt={`avatar_coincident_${el.name}`} />
                  <button className={styles.coincidentDeleteButton}>
                    <CrossIcon />
                  </button>
                  <Button className={styles.combainButton}>Combine</Button>
                </div>
                <div className={styles.coincidentName}>{el.name}</div>
              </div>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};
