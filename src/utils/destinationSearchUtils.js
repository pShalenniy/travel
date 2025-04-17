import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';

export const extractPlaceNameByType = (value, type) => {
  const placeType = value.mbId.split('.')[0];

  if (placeType === type) {
    return value;
  }

  if (!value.placeContext) {
    return null;
  }

  return _find(value.placeContext, item => item.id.split('.')[0] === type);
};

export const extractPlaceDestination = destinationInfo => {
  if (typeof destinationInfo === 'string') {
    return destinationInfo;
  }

  const country =
    extractPlaceNameByType(destinationInfo, 'country') ||
    extractPlaceNameByType(destinationInfo, 'region');

  const place = extractPlaceNameByType(destinationInfo, 'place');

  return country ? `${country.text}, ${place.text}` : place.text;
};

export const extractPlaceParams = destinationInfo => {
  if (destinationInfo && destinationInfo.mbId) {
    const country =
      extractPlaceNameByType(destinationInfo, 'country') ||
      extractPlaceNameByType(destinationInfo, 'region');

    const place = extractPlaceNameByType(destinationInfo, 'place');

    return country
      ? {
          country: encodeURI(country.text),
          place: encodeURI(place.text)
        }
      : {
          country: encodeURI(place.text),
          place: undefined
        };
  }

  return {
    place: encodeURI(destinationInfo)
  };
};

export const getNavigateToDestinationParams = (
  route,
  destinationInfo,
  query
) => {
  if (query) {
    delete query.mlt;
  }

  const params = extractPlaceParams(destinationInfo);

  if (query) {
    if (_isEqual(route.params, params) && _isEqual(route.query, query)) {
      return false;
    }

    return {
      name: 'destination',
      params: params,
      query: query
    };
  } else {
    if (_isEqual(route.params, params)) {
      return false;
    }

    return {
      name: 'destination',
      params: params
    };
  }
};
