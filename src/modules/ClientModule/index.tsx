import React from 'react';

import { CloudModule } from '../CloudModule/CloudModule';
import { ClientModal } from '../../components/ClientModal/ClientModal';

export const ClientModule = () => {
  return (
    <>
      <CloudModule />
      <ClientModal />
    </>
  );
};
