import styles from './RangeSlider.module.css';
import React, { useEffect, useState } from 'react';
import { RangeSlider as Rangeslider } from 'rsuite';
import { RangeDataType } from '../../modules/CloudModule/CloudModule';

type RangeSliderType = {
  label?: string;
  min: number;
  max: number;
  getRangeValue: (rangeValue: RangeDataType) => void;
};

export const RangeSlider: React.FC<RangeSliderType> = ({
  label,
  min = 0,
  max = 1000,
  getRangeValue,
}) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([min, max / 2]);

  useEffect(() => {
    getRangeValue(rangeValue);
  }, [rangeValue, getRangeValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label}</div>
      <div className={styles.wrapperRange}>
        <div className={styles.min}>{min}</div>
        <Rangeslider
          className={styles.range}
          min={min}
          max={max}
          onChange={setRangeValue}
          value={rangeValue}
        />
        <div className={styles.max}>{max}</div>
      </div>
    </div>
  );
};
