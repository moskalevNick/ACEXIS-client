import styles from './ToggleSwitch.module.css';
import React, { ChangeEvent } from 'react';
import { SunIcon } from '../Icons/SunIcon';
import { MoonIcon } from '../Icons/MoonIcon';
import classNames from 'classnames';

export type ToggleSwitchProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value?: number | string;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  size?: 'long' | 'short';
  labels?: React.ReactNode[];
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  onChange,
  checked,
  value,
  disabled = false,
  readOnly = false,
  labels = [<SunIcon />, <MoonIcon />],
  className,
  size = 'long',
}) => {
  const toggleSwitchClass = classNames(
    styles.switch,
    size === 'short' && styles.shortSwitch,
    className,
  );

  return (
    <label className={toggleSwitchClass}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
      />
      <span className={styles.slider}>
        <div className={styles.firstLabel}>{labels[0]}</div>
        <div className={styles.secondLabel}>{labels[1]}</div>
      </span>
    </label>
  );
};
