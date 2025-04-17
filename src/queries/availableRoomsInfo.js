import gql from 'graphql-tag';

const query = gql`
  query availableRoomsInfo(
    $checkin: String!
    $checkout: String!
    $hotelId: String!
    $corporationId: String
    $userId: String!
    $source: SuggestionSourceTypeEnum!
  ) {
    availableRoomsInfo(
      checkin: $checkin
      checkout: $checkout
      hotelId: $hotelId
      corporationId: $corporationId
      source: $source
      userId: $userId
    ) {
      availableRoomsInfo
      currency
      currencyName
    }
  }
`;

export default function availableRoomsInfo({
  apollo,
  checkin,
  checkout,
  hotelId,
  corporationId,
  userId,
  source
}) {
  return apollo.query({
    query,
    variables: {
      checkin,
      checkout,
      hotelId,
      corporationId,
      userId,
      source
    }
  });
}
