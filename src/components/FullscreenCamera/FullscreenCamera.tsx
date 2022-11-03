import React from 'react';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { setFSCameraOpen } from '../../redux/reducers/globalReducer';
import { SmallScreenIcon } from '../Icons/SmallScreenIcon';
import styles from './FullscreenCamera.module.css';

export const FullscreenCamera = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.webcamContainer}>
        <Webcam width={570} className={styles.webcam} />
        <button
          className={styles.smallScreenButton}
          onClick={() => {
            dispatch(setFSCameraOpen(false));
          }}
        >
          <SmallScreenIcon />
        </button>
      </div>
    </div>
  );
};
