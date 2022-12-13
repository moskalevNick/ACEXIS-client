import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isRus, isAuth } = useAppSelector((state) => state.globalReducer);

  const [isStateRus, setStateRus] = useState(isRus);
  const [unautorizedLang, setUnautorizedLang] = useState('');

  const defaultLanguage = localStorage.getItem('i18nextLng') || 'en';

  useEffect(() => {
    if (!isAuth && !unautorizedLang) {
      if (defaultLanguage === 'en-EN' || defaultLanguage === 'ru-RU') {
        setStateRus(defaultLanguage === 'ru-RU' ? true : false);
        dispatch(globalSettingActions.setIsRussian(defaultLanguage === 'ru-RU' ? true : false));
      }
    } else {
      setStateRus(isRus);
    }
  }, [defaultLanguage, isRus, isAuth]);

  const changeLang = useCallback(() => {
    if (!isAuth) {
      setUnautorizedLang(isStateRus ? 'ru' : 'en');
    }
    setStateRus((prev) => !prev);
  }, [isStateRus]);

  // useEffect(() => {
  //   console.log('unautorizedLang: ', unautorizedLang);
  // }, [unautorizedLang]);

  // useEffect(() => {
  //   console.log('isRus: ', isRus);
  // }, [isRus]);

  useEffect(() => {
    // console.log('isStateRus: ', isStateRus);

    i18n.changeLanguage(isStateRus ? 'ru' : 'en');
    dispatch(globalSettingActions.setIsRussian(isStateRus ? true : false));
  }, [isStateRus]);

  return <ToggleSwitch checked={!isStateRus} onChange={changeLang} labels={['РУС', 'ENG']} />;
};
