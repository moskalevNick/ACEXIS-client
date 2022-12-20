import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Button/Button';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';
import { CrossIcon } from '../Icons/CrossIcon';
import { DatepickerDataType } from '../../types';
import styles from './DatePicker.module.css';
import {
  futureDate,
  monthFullEng,
  monthFullRus,
  veryOldDate,
  yesterdayEndDay,
  yesterdayStartDay,
} from '../../helpers/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { useTranslation } from 'react-i18next';
import ru from 'date-fns/locale/ru';

type DatepickerType = {
  onSubmitDatepicker: (date: DatepickerDataType | undefined) => void;
  isShort?: boolean;
};

export const Datepicker: React.FC<DatepickerType> = ({ onSubmitDatepicker, isShort = false }) => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date | null>(yesterdayStartDay);
  const [endDate, setEndDate] = useState<Date | null>(yesterdayEndDay);
  const [isDefaultMonthView, toggleMonthView] = useState(true);
  const [monthFull, setMonthFull] = useState(monthFullEng);
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { date } = useAppSelector((state) => state.clientReducer.filters);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      if (
        date.startDate === veryOldDate.toISOString() &&
        date.endDate === futureDate.toISOString()
      ) {
        resetRange();
      } else {
        setStartDate(new Date(date.startDate));
        setEndDate(new Date(date.endDate));
      }
    }
  }, []);

  useEffect(() => {
    if (i18n.resolvedLanguage === 'ru') {
      setMonthFull(monthFullRus);
    } else setMonthFull(monthFullEng);
  }, [document]);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const getMonth = useCallback((date: Date) => date.getMonth(), []);
  const getYear = useCallback((date: Date) => date.getFullYear(), []);

  const swipeCalendar = (direction: string) => {
    if (isDefaultMonthView && direction === 'right') {
      toggleMonthView(false);
    } else if (!isDefaultMonthView && direction === 'left') toggleMonthView(true);
  };

  useEffect(() => {
    document.body.setAttribute('view-calendar', isDefaultMonthView ? 'default' : 'custom');
  }, [isDefaultMonthView]);

  const resetRange = () => {
    setStartDate(null);
    setEndDate(null);
    setIsOpen(false);
    onSubmitDatepicker({ startDate: null, endDate: null });
  };

  const resetReduxRange = () => {
    const dateForServer = {
      startDate: veryOldDate.toISOString(),
      endDate: futureDate.toISOString(),
    };
    dispatch(clientSettingsActions.setFilterDate(dateForServer));
  };

  const submitRange = () => {
    onSubmitDatepicker({ startDate, endDate });
    setIsOpen(false);
  };

  const calendarWrapperClassnames = classNames(
    styles.calendarWrapper,
    isShort && styles.shortCalendarWrapper,
  );

  return (
    <>
      <DatePicker
        className={calendarWrapperClassnames}
        onInputClick={() => setIsOpen(true)}
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        placeholderText={i18n.resolvedLanguage === 'ru' ? 'Выберите дату' : 'Select date'}
        dateFormat={isShort ? 'dd/MM' : 'MMM dd'}
        locale={i18n.resolvedLanguage === 'en' ? 'en' : ru}
        selectsRange
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <>
            <div className={styles.datepickerHeaderWrapper}>
              <div className={styles.datepickerHeader}>
                <Button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className={styles.arrowButton}
                  outlined
                >
                  <ArrowLeftIcon />
                </Button>
                <div className={styles.monthWrapper}>{`${monthFull[getMonth(date)]} ${getYear(
                  date,
                )}`}</div>
                <Button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className={styles.arrowButton}
                  outlined
                >
                  <ArrowRightIcon />
                </Button>
              </div>
              <Button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                <CrossIcon />
              </Button>
            </div>
            <hr className={styles.line} />
            <div className={styles.buttonSwipeleftContainer}>
              <Button
                className={styles.arrowButton}
                outlined
                onClick={() => swipeCalendar('left')}
                disabled={isDefaultMonthView}
              >
                <ArrowLeftIcon />
              </Button>
            </div>
            <div className={styles.buttonSwipeRightContainer}>
              <Button
                className={styles.arrowButton}
                outlined
                onClick={() => swipeCalendar('right')}
                disabled={!isDefaultMonthView}
              >
                <ArrowRightIcon />
              </Button>
            </div>
            <hr className={styles.secondLine} />
            <div className={styles.submitButtons}>
              <Button
                className={styles.cancelButton}
                outlined
                onClick={() => {
                  resetRange();
                  resetReduxRange();
                }}
              >
                {t('reset_range')}
              </Button>
              <Button className={styles.showButton} onClick={submitRange}>
                {t('show_photos')}
              </Button>
            </div>
          </>
        )}
      />
    </>
  );
};
