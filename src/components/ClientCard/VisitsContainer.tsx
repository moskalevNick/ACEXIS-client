import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { getInterval } from '../../helpers/getInterval';
import { ExisType, VisitsType } from '../../types';
import { useAppSelector } from '../../hooks/redux';
import { getDate } from '../../helpers/getDate';

type VisisitsContainerType = {
  visits?: VisitsType[];
};

type ExisAtVisitsType = {
  [key: string]: ExisType[];
};

export const VisitsContainer: React.FC<VisisitsContainerType> = ({ visits }) => {
  const [point, setPoint] = useState<null | { x: number; y: number }>(null);
  const [exisAtVisits, setExisAtVisits] = useState<ExisAtVisitsType>({});
  const storeExises = useAppSelector((state) => state.exisReducer.exises);

  useEffect(() => {
    visits?.forEach((visit) => {
      if (visit.exisId.length && storeExises.length) {
        let currentExises: ExisType[] = [];
        storeExises.forEach((exis) => {
          visit.exisId.forEach((exisId) => {
            if (exisId === exis.id) {
              currentExises.push(exis);
            }
          });
        });
        setExisAtVisits((prev) => {
          return {
            ...prev,
            [visit.id]: currentExises,
          };
        });
      }
    });
  }, [storeExises, visits]);

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
                  {el.exisId.length !== 0 && (
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
                          {exisAtVisits[el.id] &&
                            exisAtVisits[el.id].slice(-1)[0] &&
                            getDate(exisAtVisits[el.id].slice(-1)[0].date)}
                        </div>
                        <div className={styles.exisBadgeText}>
                          {exisAtVisits[el.id] &&
                            exisAtVisits[el.id].slice(-1)[0] &&
                            exisAtVisits[el.id].slice(-1)[0].text}
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
