import React from 'react';
import Webcam from 'react-webcam';
import { SmallScreenIcon } from '../Icons/SmallScreenIcon';
import styles from './FullscreenCamera.module.css';

type FullScreenType = {
  setOpenFullscreenCamera: (state: boolean) => void;
};

export const FullscreenCamera: React.FC<FullScreenType> = ({ setOpenFullscreenCamera }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.webcamContainer}>
        <Webcam width={570} className={styles.webcam} />
        <button
          className={styles.smallScreenButton}
          onClick={() => {
            setOpenFullscreenCamera(false);
          }}
        >
          <SmallScreenIcon />
        </button>
      </div>
    </div>
  );
};
