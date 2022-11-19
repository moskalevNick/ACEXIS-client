import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '../Button/Button';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';
import { CrossIcon } from '../Icons/CrossIcon';
import { DatepickerDataType } from '../../redux/types';
import styles from './DatePicker.module.css';

type DatepickerType = {
  onSubmitDatepicker: (date: DatepickerDataType | undefined) => void;
  isShort?: boolean;
};

const monthFullEng: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Datepicker: React.FC<DatepickerType> = ({ onSubmitDatepicker, isShort = false }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDefaultMonthView, toggleMonthView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (dates: [Date, Date | null]) => {
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

  const cancelRange = () => {
    setStartDate(null);
    setEndDate(null);
    setIsOpen(false);
    onSubmitDatepicker(undefined);
  };

  const submitRange = () => {
    onSubmitDatepicker([startDate, endDate]);
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
        placeholderText="Select date"
        dateFormat={isShort ? 'dd/MM' : 'MMM dd'}
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
                <div className={styles.monthWrapper}>{`${monthFullEng[getMonth(date)]} ${getYear(
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
              <Button className={styles.cancelButton} outlined onClick={cancelRange}>
                Cancel
              </Button>
              <Button className={styles.showButton} onClick={submitRange}>
                Show photos
              </Button>
            </div>
          </>
        )}
      />
    </>
  );
};
