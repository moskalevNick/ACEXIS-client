import styles from './Card.module.css';
import React, { useEffect, useState, MouseEvent, useCallback } from 'react';
import { WarninIcon } from '../Icons/WarningIcon';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { ClientType, ExisType } from '../../modules/TodayModule/TodayModule';
import { PinnedIcon } from '../Icons/PinnedIcon';
import { ClientCard } from '../ClientCard/ClientCard';
import { CrossIcon } from '../Icons/CrossIcon';
import { Button } from '../Button/Button';
import uuid from 'react-uuid';

type CardType = {
  client: ClientType;
  clients: ClientType[];
};

const CLICK_DURATION = 2500; // in ms

export const Card: React.FC<CardType> = ({ client, clients }) => {
  const [mouseDown, setMouseDown] = useState<Date | undefined>();
  const [downTarget, setDownTarget] = useState<EventTarget>();
  const [isShortDescription, setShortDescription] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [pinnedMessage, setPinnedMessage] = useState<ExisType>();
  const [coincidentClients, setCoincidentClients] = useState<ClientType[]>([]);
  const [showInfo, setShowInfo] = useState<undefined | { x: number; y: number }>();

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
        return <>err</>;
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
    const pinnedMessage = client.exises.find((el) => el.id === client.pinnedExisId);
    pinnedMessage && setPinnedMessage(pinnedMessage);
  }, [client.pinnedExisId]);

  useEffect(() => {
    if (client.coincidentIds) {
      let arr: ClientType[] = [];
      client.coincidentIds.map((elem) => {
        const coincidentClient = clients.find((el) => el.id === elem);
        if (coincidentClient) arr.push(coincidentClient);
      });
      setCoincidentClients(arr);
    }
  }, [client.coincidentIds]);

  return (
    <>
      <div
        className={styles.wrapper}
        onMouseDown={onMouseDown}
        onMouseUp={() => !openDescription && checkDelay(mouseDown, new Date())}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.imgWrapper}>
            <img src={client.imgPath[0]} alt={`avatar_${client.name}`} />
          </div>
          <div className={styles.name}>{client.name}</div>
          <div className={styles.lastVisit}>{client.lastVisit}</div>
          {client.coincidentIds?.length !== 0 && (
            <div className={styles.coincidentWrapper}>
              <div
                className={styles.warningIconWrapper}
                onMouseEnter={(ev) => !showInfo && setShowInfo({ x: ev.clientX, y: ev.clientY })}
              >
                <WarninIcon fill="#FF5C00" interfill="#FFF5F0" opacity="1" />
              </div>
            </div>
          )}
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
                  {client.lastVisit}
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.labelContent}>Average bill</div>
                  {client.averageBill ? client.averageBill : '---'}
                </div>
                {pinnedMessage && (
                  <>
                    <div className={styles.horizontalLineDescription} />
                    <div className={styles.pinnedMessageDateWrapper}>
                      <PinnedIcon />
                      <div className={styles.pinnedMessageDate}>
                        {pinnedMessage.date.toLocaleDateString()}
                      </div>
                    </div>
                    <div className={styles.pinnedMessageText}>{pinnedMessage.text}</div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <ClientCard
              clientData={client}
              isOpenClientModal={openDescription}
              setOpenClientModal={setOpenDescription}
            />
          ))}
      </div>
      {showInfo && (
        <div className={styles.coincidentContainer} style={{ left: showInfo.x, top: showInfo.y }}>
          <div className={styles.coincidentHeader}>Select coincident profile</div>
          <div className={styles.horizontalLineCoincident} />
          <div className={styles.profilesWrapper}>
            {coincidentClients.map((el) => (
              <div className={styles.coincidentCard} key={uuid()}>
                <div className={styles.imgCoincidentWrapper}>
                  <img src={el.imgPath[0]} alt={`avatar_coincident_${el.name}`} />
                  <button className={styles.coincidentDeleteButton}>
                    <CrossIcon />
                  </button>
                  <Button className={styles.combainButton}>Combine</Button>
                </div>
                <div className={styles.coincidentName}>{el.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
