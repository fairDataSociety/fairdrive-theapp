import moment from 'moment';

export const formatDate = (date: string): string =>
  moment.unix(parseInt(date)).format('DD/MM/YYYY');
