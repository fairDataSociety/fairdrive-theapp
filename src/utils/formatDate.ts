import moment from 'moment';

export default function formatDate(date: string, withTime?: boolean) {
  return withTime
    ? moment.unix(parseInt(date)).format('DD/MM/YYYY HH:mm:ss')
    : moment.unix(parseInt(date)).format('DD/MM/YYYY');
}

/**
 * Get unix timestamp in seconds
 */
export function getUnixTimestamp(): number {
  return Math.round(Date.now() / 1000);
}
