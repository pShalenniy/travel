import gql from 'graphql-tag';

const query = gql`
  query fetchHotelFacilities(
    $hotelId: String
    $source: SuggestionSourceTypeEnum!
  ) {
    fetchHotelFacilities(hotelExtId: $hotelId, source: $source) {
      hotelId
      facilities
    }
  }
`;

export default function fetchHotelFacilities({ apollo, hotelId, source }) {
  return apollo.query({
    query,
    variables: {
      hotelId,
      source
    }
  });
}
