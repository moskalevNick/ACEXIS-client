import React, { useEffect, useState } from 'react';
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
import { yesterdayEndDay, yesterdayStartDay } from '../../helpers/constants';
import { clientActions } from '../../redux/clients/actions';

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isOpenCameraWidget, setOpenCameraWidget] = useState(false);
  const [isOpenSearchInput, setOpenSearchInput] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Name, phone, exis');
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { isDark } = useAppSelector((state) => state.globalReducer);
  const { cameraToken } = useAppSelector((state) => state.globalReducer);
  const cameraView = useAppSelector((state) => state.imageReducer.cameraFrame);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isOpenCameraWidget && window.location.pathname !== '/') {
      const interval = setInterval(() => {
        dispatch(imagesActions.getStream(cameraToken));
      }, 500);
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

  useEffect(() => {
    document.body.setAttribute('color-theme', !isDark ? 'light' : 'dark');
  }, [isDark]);

  useEffect(() => {
    if (i18n.resolvedLanguage === 'ru') {
      setPlaceholderText('Имя, телефон, эксис');
    } else setPlaceholderText('Name, phone, exis');
  }, [i18n.resolvedLanguage]);

  const onClickWidget = () => {
    setOpenCameraWidget((prev) => !prev);
    dispatch(globalSettingActions.setFSCamera(false));
  };

  const onInputChange = (e: string) => {
    dispatch(clientSettingsActions.setSearchString(e));
  };

  const setYesterday = () => {
    const dateForServer = {
      startDate: yesterdayStartDay.toISOString(),
      endDate: yesterdayEndDay.toISOString(),
    };
    dispatch(clientSettingsActions.setFilterDate(dateForServer));
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
                src={`https://recognition.evocontrols.com${cameraView.img_small}`}
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
                  onClick={setYesterday}
                >
                  Cloud
                </NavLink>
              </div>
            </>
          ) : (
            <Input
              beforeIcon={<SearchIcon />}
              placeholder={placeholderText}
              containerClassName={styles.inputHeader}
              onChange={(e) => onInputChange(e.target.value)}
            />
          )}
        </>
      ) : (
        <>
          <Input
            beforeIcon={<SearchIcon />}
            placeholder={placeholderText}
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
