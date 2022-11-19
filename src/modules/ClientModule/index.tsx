import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { CloudModule } from '../CloudModule/CloudModule';
import { ClientCard } from '../../components/ClientCard/ClientCard';

export const ClientModule = () => {
  const { id } = useParams();
  const isNew = useMemo(() => id === 'new', [id]);

  return (
    <>
      <CloudModule />
      <ClientCard clientId={id} isNew={isNew} />
    </>
  );
};
