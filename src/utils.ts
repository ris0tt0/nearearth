import { enUS } from 'date-fns/locale';
import { format, isValid, parse } from 'date-fns';

export const formatFeedDate = (date: Date) => {
  const result = format(date, 'yyyy-MM-dd');

  return result;
};

export const getCurentFormattedDate = () => {
  const date = new Date();

  const result = formatFeedDate(date);

  return result;
};

export const formatFeedDateString = (date: string = '') => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), { locale: enUS });
  const isValidDate = isValid(parsedDate);

  if (!isValidDate) {
    return null;
  }

  return parsedDate;
};
