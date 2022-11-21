import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Input } from '../Input/Input';
import { AvatarIcon } from '../Icons/AvatarIcon';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { Button } from '../Button/Button';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { SettingIcon } from '../Icons/SettingIcon';
import { Modal } from '../Modal/Modal';
import { UploadIcon } from '../Icons/UploadIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { globalActions } from '../../redux/global/actions';

type HeaderSettingsType = {};

export const HeaderSettings: React.FC<HeaderSettingsType> = () => {
  const dispatch = useAppDispatch();
  const [isOpenBadge, setOpenBadge] = useState(false);
  const [isOpenSettingModal, setOpenSettingModal] = useState(false);
  const [isOpenLogautModal, setOpenLogoutModal] = useState(false);
  const [isRus, setIsRus] = useState(false);
  const theme = useAppSelector((state) => state.globalReducer.theme);
  const refBadge = useRef<HTMLHeadingElement>(null);
  const refAvatar = useRef<HTMLHeadingElement>(null);

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

  const logout = async () => {
    await dispatch(globalActions.logout());
    setOpenLogoutModal(false);
  };

  return (
    <>
      <div className={styles.settingsContainer}>
        <div className={styles.toggleThemeContainer}>
          <ToggleSwitch
            checked={theme === 'light'}
            size="short"
            onChange={() => {
              dispatch(globalSettingActions.setTheme(theme === 'light' ? 'dark' : 'light'));
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
    </>
  );
};
