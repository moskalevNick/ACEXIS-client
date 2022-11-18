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
import { exisSettingsActions } from '../../redux/exis/reducers';
type CardType = {
  client: ClientType;
  clients: ClientType[];
  showInfo?: null | { id: string; x: number; y: number };
};

const CLICK_DURATION = 2500; // in ms

export const Card: React.FC<CardType> = ({ client, clients, showInfo }) => {
  const dispatch = useAppDispatch();
  const [mouseDown, setMouseDown] = useState<Date | undefined>();
  const [downTarget, setDownTarget] = useState<EventTarget>();
  const [isShortDescription, setShortDescription] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [pinnedMessage, setPinnedMessage] = useState<ExisType>();
  const [coincidentClients, setCoincidentClients] = useState<ClientType[]>([]);
  const [lastVisit, setLastVisit] = useState<VisitsType | null>(null);
  const [clientAvatar, setClientAvatar] = useState<string | null>(null);
  const [currentClient, setCurrentClient] = useState(client);

  const stateClient = useAppSelector((state) => state.clientReducer.client);
  const statePinnedExis = useAppSelector((state) => state.exisReducer.pinnedExis);

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
    if (stateClient?.id === client.id && stateClient) {
      setCurrentClient(stateClient);
    }
  }, [stateClient, statePinnedExis]);

  useEffect(() => {
    if (currentClient.images?.length) {
      setClientAvatar(currentClient.images[currentClient.images.length - 1].publicUrl);
    }
  }, [currentClient]);

  useEffect(() => {
    if (currentClient?.visits) {
      let latest: VisitsType | undefined;

      currentClient.visits.forEach((el) => {
        if (Number(el.date) > (Number(latest?.date) || 0)) {
          latest = el;
        }
      });

      if ((latest && lastVisit && latest.date > lastVisit.date) || (!lastVisit && latest)) {
        setLastVisit(latest);
      }
    }
  }, [currentClient.visits]);

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
      dispatch(exisSettingsActions.clearExises());
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
            {clientAvatar && <img src={clientAvatar} alt={`avatar_${currentClient.name}`} />}
          </div>
          <div className={styles.name}>
            {currentClient.name ? currentClient.name : 'Unknown client'}
          </div>
          <div className={styles.lastVisit}>
            {lastVisit ? getInterval(lastVisit.date) : 'no visits'}
          </div>
          {/* {currentClient.coincidentIds?.length !== 0 && (
            <div className={styles.coincidentWrapper}>
              <div
                className={styles.warningIconWrapper}
                onMouseEnter={(ev) =>
                  !showInfo && setShowInfo({ id: currentClient.id, x: ev.clientX, y: ev.clientY })
                }
              >
                <WarninIcon fill="#FF5C00" interfill="#FFF5F0" opacity="1" />
              </div>
            </div>
          )} */}
        </div>
        <div className={styles.status}>{chooseIcon(currentClient.status)}</div>
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
                <div className={styles.nameClient}>{currentClient.name}</div>
                <div className={styles.textWrapper}>
                  <div className={styles.labelContent}>Last visit</div>
                  {lastVisit ? getInterval(lastVisit.date) : 'No visits'}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.labelContent}>Average bill</div>
                  {currentClient.bills?.length
                    ? Math.round(
                        currentClient.bills.reduce((acc, num) => acc + num, 0) /
                          currentClient.bills.length,
                      )
                    : 'No bills'}
                </div>
                {pinnedMessage && (
                  <>
                    <div className={styles.horizontalLineDescription} />
                    <div className={styles.pinnedMessageDateWrapper}>
                      <PinnedIcon />
                      <div className={styles.pinnedMessageDate}>
                        {new Date(pinnedMessage.date).toLocaleDateString()}{' '}
                        {new Date(pinnedMessage.date).toLocaleTimeString('en-GB', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                    <div className={styles.pinnedMessageText}>{pinnedMessage.text}</div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <ClientCard
              clientId={currentClient.id}
              isOpenClientModal={openDescription}
              setOpenClientModal={setOpenDescription}
            />
          ))}
      </div>
      {showInfo && showInfo.id === currentClient.id && (
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
