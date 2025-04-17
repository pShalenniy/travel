import { lineString } from 'turf-helpers';
import length from '@turf/length';

export const getLengthKm = (place1, place2) => {
  const line = lineString([place1, place2]);

  return Math.round(length(line, { units: 'kilometers' }) * 100) / 100;
};
