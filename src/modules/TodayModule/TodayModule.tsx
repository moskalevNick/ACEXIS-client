import classNames from 'classnames';
import React from 'react';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import styles from './Today.module.css';

type TodayModuleType = {
  isOpenFullScreenCamera: boolean;
};

type ExisType = {
  date: Date;
  text: string;
};

export type ClientType = {
  imgPath: string[];
  name: string;
  lastVisit: string;
  status: string;
  isSimilar: boolean;
  id: string;
  averageBill?: number;
  exises: ExisType[];
  pinnedExis?: ExisType;
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
    exises: [],
    pinnedExis: {
      text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      date: new Date('2022, 9, 22'),
    },
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'cookie',
    isSimilar: false,
    id: '2',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '3Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '3',
    exises: [],
    pinnedExis: {
      text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      date: new Date('2022, 9, 22'),
    },
    averageBill: 99231,
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '456 456',
    lastVisit: 'Today',
    status: 'goal',
    isSimilar: false,
    id: '4',
    exises: [],
  },
  {
    imgPath: ['/mocks/visitor.png'],
    name: '5Станиславов Станислав',
    lastVisit: 'Today',
    status: 'ghost',
    isSimilar: true,
    id: '5',
    exises: [],
    pinnedExis: {
      text: 'Often comes with people, orders chicken with vegetables, sometimes alcohol drinks',
      date: new Date('2022, 9, 22'),
    },
    averageBill: 99231,
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
