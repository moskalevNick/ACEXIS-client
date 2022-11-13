export const getInterval = (date: Date) => {
  const interval =
    Number(new Date().setHours(0, 0, 0, 0)) / 86400000 - Number(new Date(date)) / 86400000;
  if (interval === 0) {
    return 'Today';
  }
  if (interval === 1) {
    return 'Yesterday';
  }
  if (interval < 60) {
    return `${interval} days ago`;
  }
  if (Math.floor(interval / 30) === 6) {
    return 'Half a year ago';
  }
  if (interval < 365) {
    return `${Math.floor(interval / 30)} months ago`;
  }
  if (Math.floor(interval / 30) === 12) {
    return 'A year ago';
  }
  return 'Over a year ago';
};
