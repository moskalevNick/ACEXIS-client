import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './ControlWrapper.module.css';

export type ControlWrapperProps = {
  children:
    | React.JSXElementConstructor<{ hasError?: boolean; id?: string }>
    | React.ReactElement<{ hasError?: boolean; id?: string }>;
  getElementProps?: () => { hasError?: boolean; id?: string };
  error?: boolean;
  label?: string | React.ReactNode;
};

export const ControlWrapper: React.FC<ControlWrapperProps> = ({
  children,
  error,
  label,
  getElementProps,
}) => {
  const id = uuidv4();

  const localGetElementProps = useMemo(() => {
    return getElementProps ?? (() => ({ hasError: Boolean(error), id }));
  }, [getElementProps, error, id]);

  const childrenProps = useMemo(() => {
    return localGetElementProps();
  }, [localGetElementProps]);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={childrenProps.id} className={styles.header}>
          {label}
        </label>
      )}
      <div className={styles.content}>
        {React.cloneElement(
          children as React.FunctionComponentElement<{ hasError: boolean }>,
          childrenProps,
        )}
      </div>
    </div>
  );
};
