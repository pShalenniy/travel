import _maxBy from 'lodash/maxBy';
import _minBy from 'lodash/minBy';

export const getMarkersBounds = (center, marker) => {
  const lngDiff = 1.2 * Math.abs(center[0] - marker[0]);
  const latDiff = 1.2 * Math.abs(center[1] - marker[1]);
  const lng = [center[0] - lngDiff, center[1] - latDiff];
  const lat = [center[0] + lngDiff, center[1] + latDiff];
  return [lng, lat];
};

export const getMapBounds = bounds => {
  if (bounds.length === 0) {
    return [];
  }
  const maxLng = _maxBy(bounds, item => item.lng).lng;
  const maxLat = _maxBy(bounds, item => item.lat).lat;
  const minLng = _minBy(bounds, item => item.lng).lng;
  const minLat = _minBy(bounds, item => item.lat).lat;
  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ];
};

export const getCenterBounds = bounds => {
  const lng = (bounds[0][0] + bounds[1][0]) / 2;
  const lat = (bounds[0][1] + bounds[1][1]) / 2;
  return [lng, lat];
};
