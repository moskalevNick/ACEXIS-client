import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { imagesActions } from '../../redux/images/actions';
import { imageSettingsActions } from '../../redux/images/reducers';
import { SmallScreenIcon } from '../Icons/SmallScreenIcon';
import { Loader } from '../Loader/Loader';
import styles from './FullscreenCamera.module.css';

export const FullscreenCamera = () => {
  const dispatch = useAppDispatch();

  const cameraView = useAppSelector((state) => state.imageReducer.cameraFrame);
  const { cameraToken } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    if (window.location.pathname !== '/') {
      const interval = setInterval(() => {
        dispatch(imagesActions.getStream(cameraToken));
      }, 1000);
      return () => {
        clearInterval(interval);
        dispatch(imageSettingsActions.resetCameraFrame());
      };
    }
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.webcamContainer}>
        {cameraView ? (
          <img
            src={`http://94.250.201.198${cameraView.img_small}`}
            width={570}
            className={styles.webcam}
            alt="webcam"
          />
        ) : (
          <Loader />
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
