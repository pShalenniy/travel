import gql from 'graphql-tag';

const query = gql`
  query minimumHotelsPrices(
    $hotelIds: [String!]!
    $checkin: String!
    $checkout: String!
    $source: SuggestionSourceTypeEnum!
  ) {
    minimumHotelsPrices(
      hotelIds: $hotelIds
      checkin: $checkin
      checkout: $checkout
      source: $source
    ) {
      hotelMinimumRates {
        currency
        currencyName
        hotelId
        minimumRate
      }
    }
  }
`;

export default function minimumHotelsPrices({
  apollo,
  hotelIds,
  checkin,
  checkout,
  source
}) {
  return apollo.query({
    query,
    variables: {
      hotelIds,
      checkin,
      checkout,
      source
    }
  });
}
