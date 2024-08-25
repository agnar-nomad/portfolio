import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatReleaseDate(date: string) {
  const datetime = date && new Date(date);
  const formattedReleaseDate =
    datetime &&
    new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(datetime);
  const formattedReleaseTime =
    datetime &&
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'UTC',
      timeZoneName: 'short',
      hour: 'numeric',
      minute: 'numeric',
    }).format(datetime);

  return {
    date: formattedReleaseDate,
    time: formattedReleaseTime,
  };
}

export function formatTokenSupply(num: number | string | undefined) {
  if (num === null || num === undefined) return;

  const toFormat = Number(num);

  if (Number.isNaN(toFormat)) return num;

  if (toFormat < 10000) return num;

  const formatted = new Intl.NumberFormat('en', {
    notation: 'compact',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(toFormat);
  return formatted;
}

export function formatPercentage(num?: number | string) {
  if (num === null || num === undefined) return;

  const toFormat = Number(num);

  if (Number.isNaN(toFormat) || typeof toFormat !== 'number') return num;

  return new Intl.NumberFormat('en', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(toFormat);
}

export function truncateBlockchainAddress(fullStr: string) {
  const finalLength = 16;
  if (fullStr.length <= finalLength) return fullStr;
  const separator = '...';

  return (
    fullStr.substring(0, 7) + separator + fullStr.substring(fullStr.length - 7)
  );
  // modified from: https://ethereum.stackexchange.com/questions/136171/can-you-please-explain-how-this-truncatestr-function-works
}

export function removeHttp(url: string) {
  return url.replace(/^https?:\/\//, '');
}

export function getYesterdayDateString(format?: string) {
  return dayjs()
    .subtract(1, 'days')
    .utc()
    .hour(0)
    .startOf('hour')
    .format(format);
}

export const allowedImageMIMETypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
  'image/svg',
  'image/tiff',
];

export function checkImageFileType(file: File | 'undef') {
  if (file === 'undef') return true;
  // the above is only due to zod's behaviour or me not understanding zod in this case
  if (file?.type) {
    return allowedImageMIMETypes.includes(file.type);
  }
  return false;
}

export function isValidTwitterUsername(input: string) {
  const usernameRegex = /^@[a-zA-Z0-9_]{1,20}$/;
  return usernameRegex.test(input);
}
