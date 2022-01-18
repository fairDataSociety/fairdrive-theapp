import moment from 'moment';

export default function formatDate(date: string, withTime?: boolean) {
  return withTime
    ? moment.unix(parseInt(date)).format('DD/MM/YYYY HH:mm:ss')
    : moment.unix(parseInt(date)).format('DD/MM/YYYY');
}
