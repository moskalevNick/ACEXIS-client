import styles from './CardContainer.module.css';
import React, { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import classNames from 'classnames';
import uuid from 'react-uuid';
import { ClientType } from '../../types';

type CardContainerType = {
  clients: ClientType[];
  withLongNavbar?: boolean;
  withShortNavbar?: boolean;
};

export const CardContainer: React.FC<CardContainerType> = ({
  clients,
  withLongNavbar = false,
  withShortNavbar = false,
}) => {
  const containerClasses = classNames(
    styles.wrapper,
    withShortNavbar && styles.wrapperMinus190,
    withLongNavbar && styles.wrapperMinus278,
  );
  const [showInfo, setShowInfo] = useState<null | { id: string; x: number; y: number }>(null);

  const onClick = () => {
    setShowInfo(null);
  };

  useEffect(() => {
    const scrollPosition = Number(localStorage.getItem('scrollPosition'));
    if (scrollPosition) {
      const element = document.getElementById('cardsContainer');
      element?.scrollTo({ top: scrollPosition });
    }
  }, []);

  return (
    <div
      id="cardsContainer"
      className={containerClasses}
      onClick={onClick}
      onScroll={(e: any) => {
        if (e.target.scrollTop !== 0) {
          localStorage.setItem('scrollPosition', e.target.scrollTop);
        }
      }}
    >
      {clients.map((client) => (
        <Card key={uuid()} client={client} showInfo={showInfo} setShowInfo={setShowInfo} />
      ))}
    </div>
  );
};
