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
import { clientSettingsActions } from '../../redux/clients/reducers';
import { Loader } from '../Loader/Loader';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isOpenCameraWidget, setOpenCameraWidget] = useState(false);
  const [isOpenSearchInput, setOpenSearchInput] = useState(false);
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { theme, cameraToken } = useAppSelector((state) => state.globalReducer);
  const cameraView = useAppSelector((state) => state.imageReducer.cameraFrame);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpenCameraWidget) {
      const interval = setInterval(() => {
        dispatch(imagesActions.getStream(cameraToken));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, isOpenCameraWidget]);

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
            {cameraView && cameraView.img_small ? (
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
              placeholder={t('name_phone_exis') as string}
              containerClassName={styles.inputHeader}
              onChange={(e) => onInputChange(e.target.value)}
            />
          )}
        </>
      ) : (
        <>
          <Input
            beforeIcon={<SearchIcon />}
            placeholder={t('name_phone_exis') as string}
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
