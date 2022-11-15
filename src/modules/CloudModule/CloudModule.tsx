import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { ClientCard } from '../../components/ClientCard/ClientCard';
import { Datepicker } from '../../components/DatePicker/DatePicker';
import { PlusIcon } from '../../components/Icons/PlusIcon';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import styles from './Cloud.module.css';
import { clientActions } from '../../redux/clients/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const wording = ['Customers added yesterday', 'Customers added for selected period'];

export type DatepickerDataType = [Date | null, Date | null];
export type RangeDataType = [number, number];

export type FiltersType = {
  date?: DatepickerDataType;
  range?: [number, number];
  status?: string[];
};

const defaultValues: FiltersType = {
  date: undefined,
  range: undefined,
  status: [],
};

export const CloudModule = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState(defaultValues);
  const [isOpenAddClientModal, setOpenAddClientModal] = useState(false);
  const [isOpenRange, setOpenRange] = useState(false);
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );

  const clients = useAppSelector((state) => state.clientReducer.clients);

  useEffect(() => {
    dispatch(clientActions.getClients());
  }, [dispatch]);

  const onSubmitDatepicker = (date: DatepickerDataType | undefined) => {
    setFilters((prev) => ({ ...prev, date: date }));
  };

  const getRangeValue = (rangeValue: RangeDataType) => {
    setFilters((prev) => ({ ...prev, range: rangeValue }));
  };

  const getStatus = (status: string[]) => {
    setFilters((prev) => ({ ...prev, status: status }));
  };

  // useEffect(() => {
  //   console.log(filters);
  // }, [filters]);

  const containerClassnames = classNames(
    styles.container,
    isOpenFullScreenCamera && styles.containerWithCamera,
  );

  return (
    <div className={containerClassnames}>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>Cloud</div>
        <Button
          beforeIcon={<PlusIcon />}
          className={styles.addButton}
          onClick={() => setOpenAddClientModal(true)}
        />
        <div className={styles.wordingWrapper}>{filters.date ? wording[1] : wording[0]}</div>
        <div className={styles.counterWrapper}>
          <div className={styles.counter}>{`${clients.length} clients`}</div>
        </div>
      </div>
      <div className={styles.filtersWrapper}>
        <div className={styles.datePickerWrapper}>
          <Datepicker onSubmitDatepicker={onSubmitDatepicker} isShort={isOpenFullScreenCamera} />
        </div>
        {isOpenFullScreenCamera ? (
          <>
            <Button
              outlined
              className={styles.billButton}
              onClick={() => setOpenRange((prev) => !prev)}
            >
              Bill
            </Button>
            {isOpenRange && (
              <div className={styles.wrapperSliderAbsolute}>
                <RangeSlider label="Bill" min={50} max={1500} getRangeValue={getRangeValue} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.line} />
            <div className={styles.wrapperSlider}>
              <RangeSlider label="Bill" min={50} max={1500} getRangeValue={getRangeValue} />
            </div>
          </>
        )}
        <div className={styles.line} />
        <div className={styles.statusBar}>
          <StatusBar getStatus={getStatus} />
        </div>
      </div>
      {clients.length ? (
        <CardContainer clients={clients} withLongNavbar />
      ) : (
        <div className={styles.noClientsWrapper}>
          No client cards found. You can add them
          <Button
            beforeIcon={<PlusIcon />}
            className={styles.addButton}
            onClick={() => setOpenAddClientModal(true)}
          />
        </div>
      )}
      <ClientCard
        isOpenClientModal={isOpenAddClientModal}
        setOpenClientModal={setOpenAddClientModal}
      />
    </div>
  );
};
