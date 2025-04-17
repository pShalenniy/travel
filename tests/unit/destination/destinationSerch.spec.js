import mockPlaceInfo from './mockPlaceInfo';
import {
  extractPlaceNameByType,
  extractPlaceDestination,
  extractPlaceParams,
  getNavigateToDestinationParams
} from '@/utils/destinationSearchUtils';

describe('extractPlaceNameByType', () => {
  it('country', () => {
    const country = extractPlaceNameByType(mockPlaceInfo.default, 'country');
    expect(country.text).toBe('Romania');
  });

  it('place', () => {
    const place = extractPlaceNameByType(mockPlaceInfo.default, 'place');
    expect(place.text).toBe('Bucharest');
  });

  it('noContext', () => {
    const place = extractPlaceNameByType(
      mockPlaceInfo.withoutPlaceContext,
      'country'
    );
    expect(place).toBeNull();
  });
});

describe('extractPlaceDestination', () => {
  it('destination', () => {
    const destination = extractPlaceDestination(mockPlaceInfo.default);
    expect(destination).toBe('Romania, Bucharest');
  });

  it('destination place', () => {
    const destination = extractPlaceDestination(
      mockPlaceInfo.withoutPlaceContext
    );
    expect(destination).toBe('Bucharest');
  });

  it('destination string', () => {
    const destination = extractPlaceDestination('Bucharest');
    expect(destination).toBe('Bucharest');
  });
});

describe('extractPlaceParams', () => {
  it('default', () => {
    const placeParams = extractPlaceParams(mockPlaceInfo.default);
    expect(placeParams).toEqual({
      country: encodeURI('Romania'),
      place: encodeURI('Bucharest')
    });
  });

  it('only country', () => {
    const placeParams = extractPlaceParams(mockPlaceInfo.withoutPlaceContext);
    expect(placeParams).toEqual({
      country: encodeURI('Bucharest'),
      place: undefined
    });
  });

  it('only place', () => {
    const placeParams = extractPlaceParams('Bucharest');
    expect(placeParams).toEqual({
      place: encodeURI('Bucharest')
    });
  });
});

describe('extractPlaceParams', () => {
  const route = {
    params: { country: 'France', place: 'Paris' },
    query: { checkin: '2021-02-15', checkout: '2021-02-17' }
  };

  const routeEqual = {
    params: { country: 'Romania', place: 'Bucharest' },
    query: { checkin: '2021-02-15', checkout: '2021-02-17' }
  };

  it('equal', () => {
    const destinationParams = getNavigateToDestinationParams(
      routeEqual,
      mockPlaceInfo.default,
      routeEqual.query
    );
    expect(destinationParams).toEqual(false);
  });

  it('new and no query', () => {
    const destinationParams = getNavigateToDestinationParams(
      route,
      mockPlaceInfo.default,
      route.query
    );
    expect(destinationParams).toEqual({
      name: 'destination',
      params: { country: 'Romania', place: 'Bucharest' },
      query: { checkin: '2021-02-15', checkout: '2021-02-17' }
    });
  });

  it('equal and no query', () => {
    const destinationParams = getNavigateToDestinationParams(
      routeEqual,
      mockPlaceInfo.default
    );
    expect(destinationParams).toEqual(false);
  });

  it('new and no query', () => {
    const destinationParams = getNavigateToDestinationParams(
      route,
      mockPlaceInfo.default
    );
    expect(destinationParams).toEqual({
      name: 'destination',
      params: { country: 'Romania', place: 'Bucharest' }
    });
  });
});
