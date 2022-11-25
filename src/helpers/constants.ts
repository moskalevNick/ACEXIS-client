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

export const yesterdayStartDay = new Date(
  new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 1),
);
export const yesterdayEndDay = new Date(
  new Date(new Date().setDate(new Date().getDate() - 1)).setHours(23, 59, 59),
);

export const CLICK_DURATION = 2500; // in ms
