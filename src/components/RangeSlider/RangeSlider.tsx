import styles from './RangeSlider.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import { RangeSlider as RsuiteRangeslider } from 'rsuite';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { clientActions } from '../../redux/clients/actions';
import { clientSettingsActions } from '../../redux/clients/reducers';

type RangeSliderType = {
  label?: string;
};

type rangeValueType = {
  min: number;
  max: number;
};

export const RangeSlider: React.FC<RangeSliderType> = ({ label }) => {
  const dispatch = useAppDispatch();
  const { minBill, maxBill } = useAppSelector((state) => state.globalReducer);
  const { filters } = useAppSelector((state) => state.clientReducer);
  const [rangeValue, setRangeValue] = useState<rangeValueType>(filters.range);

  const borders = {
    min: minBill,
    max: maxBill,
  };

  useEffect(() => {
    setRangeValue(filters.range);
  }, [filters]);

  const value: [number, number] = useMemo(() => [rangeValue.min, rangeValue.max], [rangeValue]);

  const onChange = ([min, max]: [number, number]) => {
    setRangeValue({ min, max });
  };

  const submitRangeSlider = () => {
    dispatch(clientSettingsActions.setFilterRange(rangeValue));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.wrapperRange}>
        <div className={styles.min}>{borders.min}</div>
        <div onMouseUp={submitRangeSlider}>
          <RsuiteRangeslider
            className={styles.range}
            min={borders.min}
            max={borders.max}
            onChange={onChange}
            value={value}
          />
        </div>
        <div className={styles.max}>{borders.max}</div>
      </div>
    </div>
  );
};
