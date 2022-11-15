import React from 'react';
import Webcam from 'react-webcam';
import { useAppDispatch } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { SmallScreenIcon } from '../Icons/SmallScreenIcon';
import styles from './FullscreenCamera.module.css';

export const FullscreenCamera = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.webcamContainer}>
        <Webcam width={570} className={styles.webcam} />
        <button
          className={styles.smallScreenButton}
          onClick={() => {
            dispatch(globalSettingActions.setFSCamera(false));
          }}
        >
          <SmallScreenIcon />
        </button>
      </div>
    </div>
  );
};
