import styles from './CardContainer.module.css';
import React, { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import classNames from 'classnames';
import { ClientType } from '../../types';

type CardContainerType = {
  clients: ClientType[];
  withLongNavbar?: boolean;
  withShortNavbar?: boolean;
  getTickClients: (clientIds: string[]) => void;
};

export const CardContainer: React.FC<CardContainerType> = ({
  clients,
  withLongNavbar = false,
  withShortNavbar = false,
  getTickClients,
}) => {
  const containerClasses = classNames(
    styles.wrapper,
    withShortNavbar && styles.wrapperMinus190,
    withLongNavbar && styles.wrapperMinus278,
  );
  const [showInfo, setShowInfo] = useState<null | { id: string; x: number; y: number }>(null);
  const [tickedClientIds, setTickedClientIds] = useState<string[]>([]);

  const onClick = () => {
    setShowInfo(null);
  };

  getTickClients(tickedClientIds);

  useEffect(() => {
    const scrollPosition = Number(localStorage.getItem('scrollPosition'));
    if (scrollPosition) {
      const element = document.getElementById('cardsContainer');
      element?.scrollTo({ top: scrollPosition });
    }
  }, []);

  const tickClient = (id: string) => {
    if (tickedClientIds.includes(id)) {
      setTickedClientIds((prev) => prev.filter((el) => el !== id));
    } else {
      setTickedClientIds((prev) => [...prev, id]);
    }
  };

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
        <Card
          key={client.id}
          client={client}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          tickClient={tickClient}
        />
      ))}
    </div>
  );
};
