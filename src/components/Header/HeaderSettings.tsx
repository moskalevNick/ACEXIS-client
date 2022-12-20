import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Input } from '../Input/Input';
import { AvatarIcon } from '../Icons/AvatarIcon';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { Button } from '../Button/Button';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { SettingIcon } from '../Icons/SettingIcon';
import { Modal } from '../Modal/Modal';
import { UploadIconEng } from '../Icons/UploadIconEng';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalActions } from '../../redux/global/actions';
import { Loader } from '../Loader/Loader';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { useTranslation } from 'react-i18next';
import { UploadIconRus } from '../Icons/UploadIconRus';

type HeaderSettingsType = {};

export const HeaderSettings: React.FC<HeaderSettingsType> = () => {
  const dispatch = useAppDispatch();
  const [isOpenBadge, setOpenBadge] = useState(false);
  const [isOpenSettingModal, setOpenSettingModal] = useState(false);
  const [isOpenLogautModal, setOpenLogoutModal] = useState(false);
  const { minBill, maxBill, linkBot, avatar, isAvatarLoading } = useAppSelector(
    (state) => state.globalReducer,
  );
  const { isDark } = useAppSelector((state) => state.globalReducer);
  const refBadge = useRef<HTMLHeadingElement>(null);
  const refAvatar = useRef<HTMLHeadingElement>(null);
  const [minBillInputValue, setMinBillInputValue] = useState(minBill);
  const [maxBillInputValue, setMaxBillInputValue] = useState(maxBill);
  const [botInputValue, setBotInputValue] = useState(linkBot || '');
  const { t, i18n } = useTranslation();

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

  const submit = () => {
    dispatch(
      globalActions.editSettings({
        minBill: minBillInputValue,
        maxBill: maxBillInputValue,
        linkBot: botInputValue,
        isRus: i18n.resolvedLanguage === 'ru',
      }),
    );

    setOpenSettingModal(false);
  };

  const changeTheme = () => {
    dispatch(
      globalActions.editSettings({
        isDark: !isDark,
      }),
    );
  };

  const uploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      dispatch(globalActions.uploadAvatar(event.target.files[0]));
    }
  };

  return (
    <>
      <div className={styles.settingsContainer}>
        <div className={styles.toggleThemeContainer}>
          <ToggleSwitch checked={isDark} size="short" onChange={changeTheme} />
        </div>
        <div
          className={styles.avatarContainer}
          ref={refAvatar}
          onClick={() => setOpenBadge((prev) => !prev)}
          onMouseEnter={() => !isOpenBadge && setOpenBadge(true)}
        >
          {avatar ? (
            <img src={avatar.publicUrl} className={styles.avatar} alt="avatar" />
          ) : (
            <AvatarIcon />
          )}
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
              <p className={styles.buttonLabel}>{t('settings')}</p>
            </Button>
            <Button
              className={styles.badgeButton}
              onClick={() => {
                setOpenLogoutModal(true);
              }}
              beforeIcon={<LogoutIcon />}
            >
              <p className={styles.buttonLabel}>{t('exit')}</p>
            </Button>
          </div>
        )}
      </div>
      <Modal
        onClose={() => setOpenSettingModal(false)}
        open={isOpenSettingModal}
        className={styles.modalSettings}
        label={t('settings') as string}
      >
        {isAvatarLoading ? (
          <Loader />
        ) : (
          <div>
            <div className={styles.billsWrapper}>
              <div className={styles.minBillWrapper}>
                <div className={styles.labelInput}>{t('min_bill')}</div>
                <Input
                  className={styles.billInput}
                  value={minBillInputValue}
                  type="number"
                  onChange={(e) => setMinBillInputValue(Number(e.target.value))}
                />
              </div>
              <div className={styles.labelInput}>{t('max_bill')}</div>
              <Input
                className={styles.billInput}
                value={maxBillInputValue}
                type="number"
                onChange={(e) => setMaxBillInputValue(Number(e.target.value))}
              />
            </div>
            <hr className={styles.line} />
            <div className={styles.botWrapper}>
              <div className={styles.botLabel}>{t('chat_bot_telegram')}</div>
              <Input
                className={styles.botInput}
                placeholder={t('link_chat_bot_telegram') as string}
                value={botInputValue}
                onChange={(e) => setBotInputValue(e.target.value)}
              />
            </div>
            <hr className={styles.line} />
            <div className={styles.uploadPhotoWrapper}>
              <input className={styles.uploadButton} type="file" onChange={uploadAvatar} />
              {i18n.language === 'ru' ? <UploadIconRus /> : <UploadIconEng />}
              <div className={styles.labelUpload}>{t('upload_your_profile_photo')}</div>
            </div>
            <hr className={styles.line} />
            <div className={styles.languageWrapper}>
              <div className={styles.languageLabel}>{t('language')}</div>
              <LanguageSelect />
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                className={styles.cancelButton}
                outlined
                onClick={() => setOpenSettingModal(false)}
              >
                {t('cancel')}
              </Button>
              <Button className={styles.logoutButton} onClick={submit}>
                {t('save')}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        onClose={() => setOpenLogoutModal(false)}
        open={isOpenLogautModal}
        className={styles.modalLogout}
        label={t('log_out') as string}
      >
        <div className={styles.contentWrapperLogout}>
          <div className={styles.contentLogout}>{t('are_you_sure_you_want_to_log_out')}</div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.cancelButton}
              outlined
              onClick={() => setOpenLogoutModal(false)}
            >
              {t('cancel')}
            </Button>
            <Button className={styles.logoutButton} onClick={logout}>
              {t('log_out_2')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
