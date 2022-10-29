import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { GhostStatusIcon } from '../Icons/StatusIcons/GhostStatusIcon';
import { CookieStatusIcon } from '../Icons/StatusIcons/CookieStatusIcon';
import { MoonStatusIcon } from '../Icons/StatusIcons/MoonStatusIcon';
import { GoalStatusIcon } from '../Icons/StatusIcons/GoalStatusIcon';
import { WheelStatusIcon } from '../Icons/StatusIcons/WheelStatusIcon';
import styles from './StatusBar.module.css';

type StatusBarType = {
  label?: string;
  disableGhost?: boolean;
  getStatus: (status: string[]) => void;
  withoutGhost?: boolean;
  oneStatus?: boolean;
  prevStatuses?: string[];
};

type StatusType = {
  id: string;
  status: string;
  icon: React.ReactNode;
};

export const StatusBar: React.FC<StatusBarType> = ({
  label = 'Statuses',
  disableGhost = false,
  getStatus,
  withoutGhost = false,
  oneStatus = false,
  prevStatuses,
}) => {
  const [statuses, setStatuses] = useState<string[]>([]);

  const statusesArray: StatusType[] = [
    { id: '1', status: 'ghost', icon: <GhostStatusIcon /> },
    { id: '2', status: 'cookie', icon: <CookieStatusIcon /> },
    { id: '3', status: 'moon', icon: <MoonStatusIcon /> },
    { id: '4', status: 'goal', icon: <GoalStatusIcon /> },
    { id: '5', status: 'wheel', icon: <WheelStatusIcon /> },
  ];

  if (withoutGhost) statusesArray.shift();

  useEffect(() => {
    getStatus(statuses);
  }, [statuses]);

  useEffect(() => {
    if (prevStatuses?.length) {
      setStatuses(prevStatuses);
    }
  }, [prevStatuses]);

  const checkStatus = (status: string) => {
    const el = statuses.find((el) => el === status);

    if (!el) {
      setStatuses((prev) => [...prev, status]);
    } else {
      setStatuses((prev) => prev.filter((element) => element !== el));
    }
    return;
  };

  const setStatus = (status: string) => {
    setStatuses((prev) => {
      if (prev.includes(status)) {
        return [];
      } else return [status];
    });
  };

  const statusBarClasses = classNames(
    styles.statusbar,
    withoutGhost && styles.statusbarWithoutGhost,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={statusBarClasses}>
        {statusesArray.map((status) => (
          <button
            className={classNames(
              styles.button,
              Boolean(statuses.find((el) => el === status.status)) && styles.activeButton,
              disableGhost && status.status === 'ghost' && styles.disableGhost,
            )}
            onClick={(e) => {
              e.preventDefault();
              oneStatus ? setStatus(status.status) : checkStatus(status.status);
            }}
            key={status.id}
            disabled={disableGhost && status.status === 'ghost' && styles.disableGhost}
          >
            {status.icon}
          </button>
        ))}
      </div>
    </div>
  );
};
