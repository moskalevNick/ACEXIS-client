import styles from './ClientCard.module.css';
import React, { useState } from 'react';
import { getInterval } from '../../helpers/getInterval';
import { VisitsType } from '../../types';
import { useAppSelector } from '../../hooks/redux';

type VisisitsContainerType = {
  visits?: VisitsType[];
};

export const VisitsContainer: React.FC<VisisitsContainerType> = ({ visits }) => {
  const [point, setPoint] = useState<null | { x: number; y: number }>(null);

  let storeExises = useAppSelector((state) => state.exisReducer.exises);

  return (
    <div className={styles.visitsData}>
      <div className={styles.visitsWrapper}>
        <div className={styles.visitsHeader}>
          <div className={styles.visitsHeaderItem}>
            <div className={styles.visitsHeaderlabel}>Visits</div>
          </div>
          <div className={styles.visitsHeaderItem}>
            <div className={styles.visitsHeaderlabel}>Date</div>
          </div>
          <div className={styles.visitsHeaderItem}>
            <div className={styles.visitsHeaderlabel}>EXIS</div>
          </div>
        </div>
        <div className={styles.visitsContainer} onScroll={() => setPoint(null)}>
          {visits?.map((el) => (
            <div key={el.date.toString()} className={styles.visitItemWrapper}>
              <div className={styles.visitItem}>
                <div className={styles.interval}>{getInterval(el.date)}</div>
              </div>
              <div className={styles.visitItem}>
                <div className={styles.visitDate}>
                  {new Date(el.date).toLocaleDateString()}{' '}
                  {new Date(el.date).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              <div className={styles.visitItem}>
                <div
                  className={styles.exisPointWrapper}
                  onMouseEnter={(ev) => setPoint({ x: ev.clientX, y: ev.clientY })}
                  onMouseLeave={(ev) => setPoint(null)}
                >
                  {el.exisId && (
                    <>
                      <div className={styles.exisPoint} />
                      <div
                        className={styles.exisBadge}
                        style={
                          point
                            ? {
                                left: point.x + 34,
                                top: point.y - 50,
                              }
                            : {}
                        }
                      >
                        <div className={styles.exisBadgeTime}>
                          {new Date(
                            storeExises.find((exis) => exis.id === el.exisId)!.date,
                          ).toLocaleDateString()}{' '}
                          {new Date(
                            storeExises.find((exis) => exis.id === el.exisId)!.date,
                          ).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        <div className={styles.exisBadgeText}>
                          {storeExises.find((exis) => exis.id === el.exisId)?.text}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
