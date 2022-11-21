import React, { useState } from 'react';

import { Button } from '../../components/Button/Button';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Datepicker } from '../../components/DatePicker/DatePicker';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';

import { DatepickerDataType } from '../../redux/types';
import styles from './CloudFilters.module.css';

export const CloudFilters = () => {
  const [isOpenRange, setOpenRange] = useState(false);
  const { isFullScreenCameraOpen } = useAppSelector((state) => state.globalReducer);
  const dispatch = useAppDispatch();

  const onSubmitDatepicker = (date: DatepickerDataType | undefined) => {
    dispatch(globalSettingActions.setFilterDate(date));
  };

  const setStatus = (status: string[]) => {
    dispatch(globalSettingActions.setFilterStatus(status));
  };

  const onClick = () => {
    setOpenRange((prev) => !prev);
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.datePickerWrapper}>
        <Datepicker onSubmitDatepicker={onSubmitDatepicker} isShort={isFullScreenCameraOpen} />
      </div>
      {isFullScreenCameraOpen ? (
        <>
          <Button outlined className={styles.billButton} onClick={onClick}>
            Bill
          </Button>
          {isOpenRange && (
            <div className={styles.wrapperSliderAbsolute}>
              <RangeSlider label="Bill" />
            </div>
          )}
        </>
      ) : (
        <>
          <div className={styles.line} />
          <div className={styles.wrapperSlider}>
            <RangeSlider label="Bill" />
          </div>
        </>
      )}
      <div className={styles.line} />
      <div className={styles.statusBar}>
        <StatusBar getStatus={setStatus} />
      </div>
    </div>
  );
};
