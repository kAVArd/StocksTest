import { format, isToday } from 'date-fns';

export const formatDate = (date?: string) => {
  if (!date) {
    return '';
  }

  const convertedDate = new Date(date);
  const formattedTime = format(new Date(convertedDate), 'hh:mm a');
  const formattedDate = format(new Date(convertedDate), 'd LLL');

  return isToday(convertedDate) ? formattedTime : `${formattedTime}, ${formattedDate}`;
};

export default {};
