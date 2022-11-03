import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import styles from './Header.module.css';
import { ArrowRightIcon } from '../Icons/ArrowRightIcon';
import Logo from '../../assets/images/logo.png';
import { Input } from '../Input/Input';
import { SearchIcon } from '../Icons/SearchIcon';
import { AvatarIcon } from '../Icons/AvatarIcon';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { Button } from '../Button/Button';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { SettingIcon } from '../Icons/SettingIcon';
import { Modal } from '../Modal/Modal';
import { UploadIcon } from '../Icons/UploadIcon';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { FullScreenIcon } from '../Icons/FullScreenIcon';
import classNames from 'classnames';
import {
  selectFSCamera,
  selectTheme,
  setFSCameraOpen,
  setTheme,
} from '../../redux/reducers/globalReducer';
import { useSelector, useDispatch } from 'react-redux';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);
  const [isOpenBadge, setOpenBadge] = useState(false);
  const [isOpenLogautModal, setOpenLogoutModal] = useState(false);
  const [isOpenSettingModal, setOpenSettingModal] = useState(false);
  const [isRus, setIsRus] = useState(false);
  const [isOpenCameraWidget, setOpenCameraWidget] = useState(false);
  const [isOpenSearchInput, setOpenSearchInput] = useState(false);
  const refBadge = useRef<HTMLHeadingElement>(null);
  const refAvatar = useRef<HTMLHeadingElement>(null);
  const isOpenFullScreenCamera = useSelector(selectFSCamera);

  const handleClickOutside = useCallback((e: any) => {
    if (refBadge.current !== null && refAvatar.current !== null) {
      if (!refBadge.current.contains(e.target) && !refAvatar.current.contains(e.target)) {
        setOpenBadge(false);
      }
    } else return;
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, [handleClickOutside]);

  const activeStyle = {
    fontWeight: '700',
    color: '#1487F2',
    borderBottom: '3px solid #1487F2',
    transition: 'all .2s',
  };

  const logout = () => {
    setOpenLogoutModal(false);
    navigate('/login', { replace: true });
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

  return (
    <div className={wrapperClassnames}>
      <button
        className={styles.arrowRightButton}
        onClick={() => setOpenCameraWidget((prev) => !prev)}
      >
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
            <Webcam className={styles.webcam} />
            <button
              className={styles.fullScreenButton}
              onClick={() => {
                dispatch(setFSCameraOpen(true));
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
            />
          )}
        </>
      ) : (
        <>
          <Input
            beforeIcon={<SearchIcon />}
            placeholder="Name or phone number"
            containerClassName={styles.inputHeader}
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
      <div className={styles.settingsContainer}>
        <div className={styles.toggleThemeContainer}>
          <ToggleSwitch
            checked={theme === 'light'}
            size="short"
            onChange={() => {
              dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
            }}
          />
        </div>
        <div
          className={styles.avatarContainer}
          ref={refAvatar}
          onClick={() => setOpenBadge((prev) => !prev)}
          onMouseEnter={() => !isOpenBadge && setOpenBadge(true)}
        >
          <AvatarIcon />
        </div>
        {isOpenBadge && (
          <div className={styles.badge} ref={refBadge}>
            <Button
              className={styles.badgeButton}
              onClick={() => {
                setOpenSettingModal(true);
              }}
              beforeIcon={<SettingIcon />}
            >
              <p className={styles.buttonLabel}>Settings</p>
            </Button>
            <Button
              className={styles.badgeButton}
              onClick={() => {
                setOpenLogoutModal(true);
              }}
              beforeIcon={<LogoutIcon />}
            >
              <p className={styles.buttonLabel}>Exit</p>
            </Button>
          </div>
        )}
      </div>
      <Modal
        onClose={() => setOpenSettingModal(false)}
        open={isOpenSettingModal}
        className={styles.modalSettings}
        label="Settings"
      >
        <div>
          <div className={styles.billsWrapper}>
            <div className={styles.minBillWrapper}>
              <div className={styles.labelInput}>Min bill</div>
              <Input className={styles.billInput} placeholder="000000" />
            </div>
            <div className={styles.labelInput}>Max bill</div>
            <Input className={styles.billInput} placeholder="000000" />
          </div>
          <hr className={styles.line} />
          <div className={styles.botWrapper}>
            <div className={styles.botLabel}>Chat bot telegram</div>
            <Input className={styles.botInput} placeholder="Link chat bot telegram" />
          </div>
          <hr className={styles.line} />
          <div className={styles.uploadPhotoWrapper}>
            <Button beforeIcon={<UploadIcon />} className={styles.uploadButton} outlined />
            <div className={styles.labelUpload}>Upload your profile photo</div>
          </div>
          <hr className={styles.line} />
          <div className={styles.languageWrapper}>
            <div className={styles.languageLabel}>Language</div>
            <ToggleSwitch
              labels={['РУС', 'ENG']}
              checked={isRus}
              onChange={() => setIsRus((prev) => !prev)}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.cancelButton}
              outlined
              onClick={() => setOpenSettingModal(false)}
            >
              Cancel
            </Button>
            <Button className={styles.logoutButton} onClick={() => setOpenSettingModal(false)}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        onClose={() => setOpenLogoutModal(false)}
        open={isOpenLogautModal}
        className={styles.modalLogout}
        label="Log out"
      >
        <div className={styles.contentWrapperLogout}>
          <div className={styles.contentLogout}>Are you sure you want to log out?</div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.cancelButton}
              outlined
              onClick={() => setOpenLogoutModal(false)}
            >
              Cancel
            </Button>
            <Button className={styles.logoutButton} onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
