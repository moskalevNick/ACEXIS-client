import classNames from 'classnames';
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { ClientCard } from '../../components/ClientCard/ClientCard';
import { Datepicker } from '../../components/DatePicker/DatePicker';
import { PlusIcon } from '../../components/Icons/PlusIcon';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider';
import { StatusBar } from '../../components/StatusBar/StatusBar';
import { ClientType } from '../TodayModule/TodayModule';
import styles from './Cloud.module.css';

const clients: ClientType[] = [
  {
    imgPath: ['/mocks/visitor2.png', '/mocks/small.png', '/mocks/small2.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '1',
    exises: [
      {
        date: new Date('2022, 8, 23'),
        text: '1Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      },
      {
        date: new Date('2022, 9, 24'),
        text: '2Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      },
      {
        date: new Date('2022, 9, 24'),
        text: '3Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      },
      {
        date: new Date('2022, 9, 24'),
        text: '4Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      },
      {
        date: new Date('2022, 9, 24'),
        text: '5Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      },
    ],
    pinnedExis: {
      text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      date: new Date('2022, 9, 22'),
    },
    averageBill: 99231,
    phoneNumber: '+375441234567',
  },
  {
    imgPath: ['/mocks/visitor2.png'],
    name: 'вфы выфавыавы',
    lastVisit: 'Today',
    status: 'cookie',
    isSimilar: false,
    id: '2',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: 'мвымкупку мвыаыауцк',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '3',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor2.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'goal',
    isSimilar: false,
    id: '4',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '123 123',
    lastVisit: 'Today',
    status: 'wheel',
    isSimilar: true,
    id: '5',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: false,
    id: '6',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '123 123',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '7',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: false,
    id: '8',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '123 123',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '9',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: false,
    id: '10',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '123 123',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '11',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: false,
    id: '12',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '123 123',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '13',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: false,
    id: '14',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '123 123',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: true,
    id: '15',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'moon',
    isSimilar: false,
    id: '16',
    exises: [],
  },
];

const wording = ['Customers added yesterday', 'Customers added for selected period'];

type CloudModuleType = {
  isOpenFullScreenCamera: boolean;
};

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

export const CloudModule: React.FC<CloudModuleType> = ({ isOpenFullScreenCamera }) => {
  const [filters, setFilters] = useState(defaultValues);
  const [isOpenAddClientModal, setOpenAddClientModal] = useState(false);
  const [isOpenRange, setOpenRange] = useState(false);

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
