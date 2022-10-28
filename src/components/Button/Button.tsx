import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

export type ButtonProps = {
  children?: React.ReactNode;
  id?: string;
  type?: 'button' | 'reset' | 'submit';
  outlined?: boolean;
  orange?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
  beforeIcon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent) => void;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  outlined = false,
  orange = false,
  disabled,
  beforeIcon = null,
  className,
  ariaLabel,
  contentClassName,
  type = 'button',
  onClick,
  onKeyPress,
  id,
}) => {
  const btnClass = classNames(
    styles.button,
    outlined && styles.outlined,
    orange && styles.orange,
    className,
  );
  const contentClass = classNames(
    styles.contentClasss,
    beforeIcon && styles.iconbefore,
    contentClassName && contentClassName,
  );

  return (
    <button
      id={id}
      type={type}
      className={btnClass}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onKeyPress={onKeyPress}
    >
      {beforeIcon && beforeIcon}
      {children && <span className={contentClass}>{children}</span>}
    </button>
  );
};
