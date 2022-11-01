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
  coincidentIds?: string[];
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
    coincidentIds: ['1', '2', '3', '4', '5', '6', '7'],
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
        text: 'Was with several people, ordered fish and chips and 8 litres of beer',
        date: new Date('2022, 3, 25'),
        id: '1',
      },
      {
        text: '2Was with several people, ordered fish and chips and 8 litres of beer',
        date: new Date('2022, 10, 27'),
        id: '2',
      },
      {
        text: '3Was with several people, ordered fish and chips and 8 litres of beer',
        date: new Date('2022, 10, 27'),
        id: '3',
      },
      {
        text: '4Was with several people, ordered fish and chips and 8 litres of beer',
        date: new Date('2022, 10, 27'),
        id: '4',
      },
    ],
    pinnedExisId: '1',
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor2.png'],
    name: '2Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    coincidentIds: [],
    id: '2',
    visits: [],
    exises: [
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 10, 22'),
        id: '1',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 4, 22'),
        id: '2',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2021, 9, 22'),
        id: '3',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 2'),
        id: '4',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 7, 22'),
        id: '5',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2020, 9, 22'),
        id: '6',
      },
      {
        text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
        date: new Date('2022, 9, 2'),
        id: '7',
      },
    ],
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '3Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    coincidentIds: [],
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
    coincidentIds: [],
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
    coincidentIds: [],
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
    coincidentIds: [],
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
    coincidentIds: [],
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
    coincidentIds: [],
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
  {
    imgPath: ['/mocks/visitor.png'],
    name: '1Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    coincidentIds: [],
    id: '9',
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
    coincidentIds: [],
    id: '10',
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
    coincidentIds: [],
    id: '11',
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
    coincidentIds: [],
    id: '12',
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
    coincidentIds: [],
    id: '13',
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
    coincidentIds: [],
    id: '14',
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
    coincidentIds: [],
    id: '15',
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
    coincidentIds: [],
    id: '16',
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
