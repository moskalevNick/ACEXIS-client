import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';
import Logo from '../../assets/images/logo.png';
import { Input } from '../Input/Input';
import { SearchIcon } from '../Icons/SearchIcon';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { FullScreenIcon } from '../Icons/FullScreenIcon';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { HeaderSettings } from './HeaderSettings';
import { imagesActions } from '../../redux/images/actions';
import { clientActions } from '../../redux/clients/actions';
import { clientSettingsActions } from '../../redux/clients/reducers';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isOpenCameraWidget, setOpenCameraWidget] = useState(false);
  const [isOpenSearchInput, setOpenSearchInput] = useState(false);
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const theme = useAppSelector((state) => state.globalReducer.theme);
  const cameraView = useAppSelector((state) => state.imageReducer.cameraFrame);

  useEffect(() => {
    if (isOpenCameraWidget) {
      const interval = setInterval(() => {
        dispatch(imagesActions.getCameraFrame());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpenCameraWidget]);

  const activeStyle = {
    fontWeight: '700',
    color: '#1487F2',
    borderBottom: '3px solid #1487F2',
    transition: 'all .2s',
  };

  const wrapperClassnames = classNames(
    styles.wrapper,
    isOpenFullScreenCamera && styles.wrapperWithCamera,
  );

  const wrapperToggleWithCamera = classNames(
    styles.wrapperSectionToggle,
    styles.wrapperSectionToggleWithOpenCamera,
  );

  useLayoutEffect(() => {
    document.body.setAttribute('color-theme', theme === 'light' ? 'light' : 'dark');
  }, [theme]);

  const onClickWidget = () => {
    setOpenCameraWidget((prev) => !prev);
    dispatch(globalSettingActions.setFSCamera(false));
  };

  const onInputChange = (e: string) => {
    dispatch(clientSettingsActions.setSearchString(e));
  };

  return (
    <div className={wrapperClassnames}>
      <button className={styles.arrowRightButton} onClick={onClickWidget}>
        <ArrowRightIcon />
      </button>
      {isOpenCameraWidget && (
        <div className={styles.cameraWidgetWrapper}>
          <button
            className={styles.arrowLeftButton}
            onClick={() => setOpenCameraWidget((prev) => !prev)}
          >
            <ArrowLeftIcon />
          </button>
          <div className={styles.smallCameraView}>
            {cameraView && (
              <img
                src={`http://192.168.1.106/${cameraView.img_small}`}
                width={570}
                className={styles.webcam}
              />
            )}
            <button
              className={styles.fullScreenButton}
              onClick={() => {
                dispatch(globalSettingActions.setFSCamera(true));
                setOpenCameraWidget(false);
              }}
            >
              <FullScreenIcon />
            </button>
          </div>
        </div>
      )}
      <img src={Logo} width="114" height="40" alt="ACEXIS logo" />
      {isOpenFullScreenCamera ? (
        <>
          {!isOpenSearchInput ? (
            <>
              <button className={styles.smallSearchButton} onClick={() => setOpenSearchInput(true)}>
                <SearchIcon />
              </button>
              <div className={wrapperToggleWithCamera}>
                <NavLink
                  to="/"
                  end
                  className={styles.section}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Today
                </NavLink>
                <NavLink
                  to="/cloud"
                  className={styles.section}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  Cloud
                </NavLink>
              </div>
            </>
          ) : (
            <Input
              beforeIcon={<SearchIcon />}
              placeholder="Name or phone number"
              containerClassName={styles.inputHeader}
              onChange={(e) => onInputChange(e.target.value)}
            />
          )}
        </>
      ) : (
        <>
          <Input
            beforeIcon={<SearchIcon />}
            placeholder="Name or phone number"
            containerClassName={styles.inputHeader}
            onChange={(e) => onInputChange(e.target.value)}
          />
          <div className={styles.wrapperSectionToggle}>
            <NavLink
              to="/"
              end
              className={styles.section}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Today
            </NavLink>
            <NavLink
              to="/cloud"
              className={styles.section}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Cloud
            </NavLink>
          </div>
        </>
      )}
      <HeaderSettings />
    </div>
  );
};
