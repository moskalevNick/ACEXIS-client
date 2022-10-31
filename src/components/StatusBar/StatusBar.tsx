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

const statusesArray: StatusType[] = [
  { id: '1', status: 'ghost', icon: <GhostStatusIcon /> },
  { id: '2', status: 'cookie', icon: <CookieStatusIcon /> },
  { id: '3', status: 'moon', icon: <MoonStatusIcon /> },
  { id: '4', status: 'goal', icon: <GoalStatusIcon /> },
  { id: '5', status: 'wheel', icon: <WheelStatusIcon /> },
];

export const StatusBar: React.FC<StatusBarType> = ({
  label = 'Statuses',
  disableGhost = false,
  getStatus,
  withoutGhost = false,
  oneStatus = false,
  prevStatuses,
}) => {
  const [statuses, setStatuses] = useState<string[]>([]);

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

  const isActive = (status: string) => {
    return statuses.includes(status);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={statusBarClasses}>
        {statusesArray.map(({ status, id, icon }, i) => (
          <button
            className={classNames(
              styles.button,
              isActive(status) && styles.activeButton,
              !oneStatus &&
                isActive(status) &&
                i < statusesArray.length - 1 &&
                isActive(statusesArray[i + 1].status) &&
                styles.activeButtonRight,
              !oneStatus &&
                isActive(status) &&
                i > 0 &&
                isActive(statusesArray[i - 1].status) &&
                styles.activeButtonLeft,
              !oneStatus &&
                isActive(status) &&
                i > 0 &&
                isActive(statusesArray[i - 1].status) &&
                i < statusesArray.length - 1 &&
                isActive(statusesArray[i + 1].status) &&
                styles.activeButtonBoth,
              disableGhost && status === 'ghost' && styles.disableGhost,
            )}
            onClick={(e) => {
              e.preventDefault();
              oneStatus ? setStatus(status) : checkStatus(status);
            }}
            key={id}
            disabled={disableGhost && status === 'ghost' && styles.disableGhost}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};
