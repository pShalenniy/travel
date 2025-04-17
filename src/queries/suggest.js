import gql from 'graphql-tag';

const query = gql`
  query suggest(
    $destination: String
    $latitude: Float
    $longitude: Float
    $type: String!
    $offset: Int
    $travelStarting: String
    $travelEnding: String
    $corporationId: String
    $userId: String
    $activeTripId: String
    $comingFromEmailML: Boolean
  ) {
    suggest(
      destination: $destination
      latitude: $latitude
      longitude: $longitude
      type: $type
      offset: $offset
      travelStarting: $travelStarting
      travelEnding: $travelEnding
      corporationId: $corporationId
      userId: $userId
      activeTripId: $activeTripId
      comingFromEmailMl: $comingFromEmailML
    ) {
      currency
      currencyName
      extId
      lat
      lng
      name
      price
      rating
      source
      thumbnailUrl
      freeCancellation
      options
    }
  }
`;

export default function suggest({
  apollo,
  destination,
  latitude,
  longitude,
  type,
  travelStarting,
  travelEnding,
  offset,
  corporationId,
  userId,
  activeTripId,
  comingFromEmailML
}) {
  return apollo.query({
    query,
    variables: {
      destination,
      latitude,
      longitude,
      type,
      travelStarting,
      travelEnding,
      offset,
      corporationId,
      userId,
      activeTripId,
      comingFromEmailML
    }
  });
}
