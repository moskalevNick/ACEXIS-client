import styles from './CardContainer.module.css';
import React from 'react';
import { Card } from '../Card/Card';
import classNames from 'classnames';
import { ClientType } from '../../modules/TodayModule/TodayModule';

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

  return (
    <div className={containerClasses}>
      {clients.map((client) => (
        <Card client={client} key={client.id} clients={clients} />
      ))}
    </div>
  );
};
