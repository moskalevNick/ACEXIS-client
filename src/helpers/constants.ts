export const monthFullEng: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthFullRus: string[] = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const yesterdayStartDay = new Date(
  new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 1),
);
export const yesterdayEndDay = new Date(
  new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59),
);

export const todayStart = new Date(new Date().setHours(0, 0, 1));
export const todayEnd = new Date(new Date().setHours(23, 59, 59));

export const veryOldDate = new Date(2020, 1, 1);
export const futureDate = new Date(
  new Date(new Date().setDate(new Date().getDate() + 1)).setHours(23, 59, 59),
);

export const dayAgo = new Date(Number(new Date()) - 24 * 60 * 60 * 1000);

export const threeHoursAgo = new Date(new Date().setHours(new Date().getHours() - 3));

export const CLICK_DURATION = 2500; // in ms
