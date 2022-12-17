import { t } from 'i18next';
import i18n from '../i18n';

export const getInterval = (date: Date) => {
  const interval =
    Number(new Date().setHours(0, 0, 0, 0)) / 86400000 -
    Number(new Date(date).setHours(0, 0, 0, 0)) / 86400000;

  if (interval === 0) {
    return t('today');
  }
  if (interval === 1) {
    return t('yesterday');
  }
  if (interval < 60) {
    if (i18n.resolvedLanguage === 'ru') {
      switch (interval) {
        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
        case 24: {
          return `${interval} дня назад`;
        }
        case 21:
        case 31: {
          return `${interval} день назад`;
        }
        default: {
          return `${interval} дней назад`;
        }
      }
    } else {
      return `${interval} days ago`;
    }
  }
  if (Math.floor(interval / 30) === 6) {
    return t('half_a_year_ago');
  }
  if (interval < 335) {
    if (i18n.resolvedLanguage === 'ru') {
      switch (Math.floor(interval / 30)) {
        case 2:
        case 3:
        case 4: {
          return `${Math.floor(interval / 30)} месяца назад`;
        }
        default: {
          return `${Math.floor(interval / 30)} месяцев назад`;
        }
      }
    } else {
      return `${Math.floor(interval / 30)} months ago`;
    }
  }
  if (Math.floor(interval / 30) === 12) {
    return t('a_year_ago');
  }
  return t('over_a_year_ago');
};
