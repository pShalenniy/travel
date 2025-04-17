import moment from 'moment';

export const completeDate = 'YYYY-MM-DD';
export const viewDate = 'DD MMM';
export const monthYearDate = 'YYYY-MM';

export const getNights = (dateStart, dateEnd) => {
  return Math.abs(moment(dateEnd).diff(moment(dateStart), 'days'));
};

export const getRangeDatesFormatted = (dateStart, dateEnd) => {
  const start = moment(dateStart).format(viewDate);
  const end = moment(dateEnd).format(viewDate);
  return `${start} - ${end}`;
};
