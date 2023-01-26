import styles from './ClientCard.module.css';
import React, { useEffect, useState } from 'react';
import { getInterval } from '../../helpers/getInterval';
import { ExisType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getDate } from '../../helpers/getDate';
import { t } from 'i18next';
import { Button } from '../Button/Button';
import { CrossIcon } from '../Icons/CrossIcon';
import { visitActions } from '../../redux/visit/actions';

type ExisAtVisitsType = {
  [key: string]: ExisType[];
};

export const VisitsContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [point, setPoint] = useState<null | { x: number; y: number }>(null);
  const [exisAtVisits, setExisAtVisits] = useState<ExisAtVisitsType>({});
  const exises = useAppSelector((state) => state.exisReducer.exises);
  const visits = useAppSelector((state) => state.visitReducer.visits);

  useEffect(() => {
    visits?.forEach((visit) => {
      if (visit.exisId.length && exises.length) {
        let currentExises: ExisType[] = [];
        exises.forEach((exis) => {
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
  }, [exises, visits]);

  const deleteVisit = (id: string) => {
    dispatch(visitActions.deleteVisit(id));
  };

  return (
    <div className={styles.visitsData}>
      <div className={styles.visitsWrapper}>
        <div className={styles.visitsHeader}>
          <div className={styles.visitsHeaderItem}>
            <div className={styles.visitsHeaderlabel}>{t('visits')}</div>
          </div>
          <div className={styles.visitsHeaderItem}>
            <div className={styles.visitsHeaderlabel}>{t('date')}</div>
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
              <div className={styles.btnClose} onClick={() => deleteVisit(el.id)}>
                <CrossIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
