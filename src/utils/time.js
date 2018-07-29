export const dateDiff = (hisTime, nowTime) => {
  if (!hisTime && !nowTime) return '';
  const now = typeof nowTime === 'number' ? nowTime : Date.now();
  const diffValue = now - hisTime;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  const resultYear = diffValue / year;
  const resultMonth = diffValue / month;
  const resultWeek = diffValue / (7 * day);
  const resultDay = diffValue / day;
  const resultHour = diffValue / hour;
  const resultMin = diffValue / minute;

  if (resultYear >= 1) return `${parseInt(resultYear, 10)}年前`;
  if (resultMonth >= 1) return `${parseInt(resultMonth, 10)}个月前`;
  if (resultWeek >= 1) return `${parseInt(resultWeek, 10)}周前`;
  if (resultDay >= 1) return `${parseInt(resultDay, 10)}天前`;
  if (resultHour >= 1) return `${parseInt(resultHour, 10)}个小时前`;
  if (resultMin >= 1) return `${parseInt(resultMin, 10)}分钟前`;
  return '刚刚';
};