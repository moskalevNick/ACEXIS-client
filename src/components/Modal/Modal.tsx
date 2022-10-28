import React, { MouseEvent } from 'react';
import classNames from 'classnames';

import styles from './Modal.module.css';
import { CrossIcon } from '../Icons/CrossIcon';

export type ModalProps = {
  open?: boolean;
  className?: string;
  children?: React.ReactNode | React.ReactElement[];
  onClose?: () => void;
  label?: string;
};

export const Modal: React.FC<ModalProps> = ({
  open = false,
  children,
  className,
  onClose,
  label,
}) => {
  const wrapperClass = classNames(styles.modal, !open && styles.hidden);

  const closeModal = (ev: MouseEvent<HTMLElement>): void => {
    const trgClass = (ev.target as Element).className;
    const trgCurClass = (ev.currentTarget as Element).className;

    if (trgClass === wrapperClass || trgCurClass === styles.btnClose) {
      ev.stopPropagation();
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className={wrapperClass} onMouseDown={closeModal}>
      <div className={classNames(styles.container, className && className)}>
        {label && (
          <>
            <div className={styles.modalLabel}>{label}</div>
            <hr className={styles.line} />
          </>
        )}
        {children}
        <div className={styles.btnClose} onClick={closeModal}>
          <CrossIcon />
        </div>
      </div>
    </div>
  );
};
