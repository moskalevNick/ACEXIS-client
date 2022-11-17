import React, { ChangeEvent, FocusEvent } from 'react';
import classNames from 'classnames';
import styles from './Input.module.css';

export type InputProps = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  containerClassName?: string;
  className?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: number | string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  min?: string | number;
  max?: string | number;
  id?: string;
  readOnly?: boolean;
  ariaLabel?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChange,
      autoFocus = false,
      disabled = false,
      hasError = false,
      name,
      type = 'text',
      placeholder,
      value,
      beforeIcon,
      afterIcon,
      containerClassName,
      className,
      min,
      max,
      readOnly = false,
      onKeyDown,
      id,
      ariaLabel,
      onBlur,
    },
    ref,
  ) => {
    const containerClass = classNames(styles.wrapper, containerClassName && containerClassName);

    const inputClass = classNames(
      styles.input,
      hasError && styles.hasError,
      beforeIcon && styles.inputWithBeforeIcon,
      afterIcon && styles.inputWithAfterIcon,
      className && className,
    );

    return (
      <div className={containerClass}>
        {beforeIcon && <span className={styles.beforeIcon}>{beforeIcon}</span>}
        <input
          aria-label={ariaLabel}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          className={inputClass}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus={autoFocus}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          max={max}
          id={id}
          min={min}
          ref={ref}
        />
        {afterIcon && <span className={styles.afterIcon}>{afterIcon}</span>}
      </div>
    );
  },
);
