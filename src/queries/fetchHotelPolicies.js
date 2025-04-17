import gql from 'graphql-tag';

const query = gql`
  query fetchHotelPolicies(
    $hotelId: String
    $source: SuggestionSourceTypeEnum!
  ) {
    fetchHotelPolicies(hotelExtId: $hotelId, source: $source) {
      hotelId
      policies
    }
  }
`;

export default function fetchHotelPolicies({ apollo, hotelId, source }) {
  return apollo.query({
    query,
    variables: {
      hotelId,
      source
    }
  });
}
