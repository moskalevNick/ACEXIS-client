import styles from './RangeSlider.module.css';
import React, { useMemo } from 'react';
import { RangeSlider as RsuiteRangeslider } from 'rsuite';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';

type RangeSliderType = {
  label?: string;
};

export const RangeSlider: React.FC<RangeSliderType> = ({ label }) => {
  const dispatch = useAppDispatch();
  const { minBill, maxBill, filters } = useAppSelector((state) => state.globalReducer);

  const borders = {
    min: minBill,
    max: maxBill,
  };

  const value: [number, number] = useMemo(
    () => [filters.range.min, filters.range.max],
    [filters.range],
  );

  const setRangeValue = ([min, max]: [number, number]) => {
    // FIXMY: add setTimeout
    dispatch(globalSettingActions.setFilterRange({ min, max }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.wrapperRange}>
        <div className={styles.min}>{borders.min}</div>
        <RsuiteRangeslider
          className={styles.range}
          min={borders.min}
          max={borders.max}
          onChange={setRangeValue}
          value={value}
        />
        <div className={styles.max}>{borders.max}</div>
      </div>
    </div>
  );
};
