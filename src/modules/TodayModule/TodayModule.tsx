import classNames from 'classnames';
import React from 'react';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import styles from './Today.module.css';

type TodayModuleType = {
  isOpenFullScreenCamera: boolean;
};

export type ExisType = {
  id: string;
  date: Date;
  text: string;
};

type VisitsType = {
  date: Date;
  exisId?: string;
};

export type ClientType = {
  imgPath: string[];
  name: string;
  lastVisit: string;
  status: string;
  isSimilar: boolean;
  id: string;
  averageBill?: number;
  visits: VisitsType[];
  exises: ExisType[];
  pinnedExisId?: string;
  phoneNumber?: string;
};

const clients: ClientType[] = [
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '1',
    visits: [
      { date: new Date('2021, 9, 25') },
      { date: new Date('2021, 10, 25') },
      { date: new Date('2021, 11, 25') },
      { date: new Date('2021, 12, 25') },
      { date: new Date('2022, 1, 25') },
      { date: new Date('2022, 2, 25') },
      { date: new Date('2022, 3, 25'), exisId: '1' },
      { date: new Date('2022, 4, 25') },
      { date: new Date('2022, 5, 25') },
      { date: new Date('2022, 6, 25') },
      { date: new Date('2022, 7, 25') },
      { date: new Date('2022, 8, 25') },
      { date: new Date('2022, 9, 25') },
      { date: new Date('2022, 10, 25') },
      { date: new Date('2022, 10, 26') },
      { date: new Date('2022, 10, 27'), exisId: '2' },
      { date: new Date('2022, 10, 28') },
    ],
    exises: [
      {
        text: '2Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 3, 25'),
        id: '1',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 10, 27'),
        id: '2',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '2',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '3',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '4',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '5',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '6',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '7',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '8',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 22'),
        id: '1',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
];

export const TodayModule: React.FC<TodayModuleType> = ({ isOpenFullScreenCamera }) => {
  const containerClassnames = classNames(
    styles.container,
    isOpenFullScreenCamera && styles.containerWithCamera,
  );

  return (
    <div className={containerClassnames}>
      <div className={styles.label}>Today</div>
      <CardContainer clients={clients} withShortNavbar />
    </div>
  );
};
