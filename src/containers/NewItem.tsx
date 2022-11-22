import { FC } from 'react';

export type NewItemProps = {
  component: FC<any>;
};

export const NewItem: FC<NewItemProps> = ({ component: Component }) => {
  return <Component />;
};
