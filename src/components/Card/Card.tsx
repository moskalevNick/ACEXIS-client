import styles from './Card.module.css';
import React, { useEffect, useState } from 'react';
import { WarninIcon } from '../Icons/WarningIcon';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { ClientType } from '../../modules/TodayModule/TodayModule';
import { PinnedIcon } from '../Icons/PinnedIcon';
import { ClientCard } from '../ClientCard/ClientCard';
type CardType = {
  client: ClientType;
};

export const Card: React.FC<CardType> = ({ client }) => {
  const [mouseDown, setMouseDown] = useState<Date | undefined>();
  const [isShortDescription, setShortDescription] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);

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

  const checkDelay = (down: Date | undefined, up: Date) => {
    if (Number(up) - Number(down) > 2500) {
      setShortDescription(true);
    } else setShortDescription(false);
    setOpenDescription(true);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseDown={() => setMouseDown(new Date())}
      onMouseUp={() => {
        checkDelay(mouseDown, new Date());
      }}
    >
      <div className={styles.contentWrapper}>
        <div className={styles.imgWrapper}>
          <img src={client.imgPath[0]} alt={`avatar_${client.name}`} />
        </div>
        <div className={styles.name}>{client.name}</div>
        <div className={styles.lastVisit}>{client.lastVisit}</div>
        {client.isSimilar && (
          <div className={styles.warning}>
            <WarninIcon fill="#FF5C00" interfill="#FFF5F0" opacity="1" />
          </div>
        )}
      </div>
      <div className={styles.status}>{chooseIcon(client.status)}</div>
      {openDescription &&
        (isShortDescription ? (
          <div className={styles.shortDescriptionWrapper}>
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
              {client.pinnedExis && (
                <>
                  <div className={styles.horizontalLine} />
                  <div className={styles.pinnedMessageDateWrapper}>
                    <PinnedIcon />
                    <div className={styles.pinnedMessageDate}>
                      {`${client.pinnedExis?.date?.getDate()}.${
                        client.pinnedExis?.date?.getMonth() + 1 < 10
                          ? `0${client.pinnedExis?.date?.getMonth() + 1}`
                          : client.pinnedExis?.date?.getMonth() + 1
                      }.${client.pinnedExis?.date?.getFullYear()}`}
                    </div>
                  </div>
                  <div className={styles.pinnedMessageText}>{client.pinnedExis.text}</div>
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
  );
};
