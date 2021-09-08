import moment from 'moment';

export const formatDate = (date: string, withTime?: boolean): string =>
  withTime
    ? moment.unix(parseInt(date)).format('DD/MM/YYYY HH:mm:ss')
    : moment.unix(parseInt(date)).format('DD/MM/YYYY');
