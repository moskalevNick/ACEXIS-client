import React, { useEffect, useState } from 'react';

import { Button } from '../../components/Button/Button';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { Datepicker } from '../../components/DatePicker/DatePicker';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';

import { DatepickerDataType } from '../../types';
import styles from './CloudFilters.module.css';
import { clientSettingsActions } from '../../redux/clients/reducers';

export const CloudFilters = () => {
  const [isOpenRange, setOpenRange] = useState(false);
  const { isFullScreenCameraOpen } = useAppSelector((state) => state.globalReducer);
  const dispatch = useAppDispatch();

  const onSubmitDatepicker = (date: DatepickerDataType | undefined) => {
    if (date) {
      const dateForServer = {
        startDate: new Date(new Date(date.startDate).setHours(0, 0, 1)).toISOString(),
        endDate: new Date(new Date(date.endDate).setHours(23, 59, 59)).toISOString(),
      };

      dispatch(clientSettingsActions.setFilterDate(dateForServer));
    }
  };

  const setStatus = (status: string[]) => {
    dispatch(clientSettingsActions.setFilterStatus(status));
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
