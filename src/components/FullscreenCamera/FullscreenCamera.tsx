import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { imagesActions } from '../../redux/images/actions';
import { imageSettingsActions } from '../../redux/images/reducers';
import { SmallScreenIcon } from '../Icons/SmallScreenIcon';
import styles from './FullscreenCamera.module.css';

export const FullscreenCamera = () => {
  const dispatch = useAppDispatch();

  const cameraView = useAppSelector((state) => state.imageReducer.cameraFrame);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(imagesActions.getCameraFrame());
    }, 1000);
    return () => {
      clearInterval(interval);
      dispatch(imageSettingsActions.resetCameraFrame());
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.webcamContainer}>
        {cameraView && (
          <img
            src={`http://192.168.1.106/${cameraView.img_small}`}
            width={570}
            className={styles.webcam}
            alt="webcam"
          />
        )}
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
