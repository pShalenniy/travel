import gql from 'graphql-tag';

const query = gql`
  query searchPlaces(
    $searchTerm: String!
    $country: String
    $types: [MbPlaceTypesEnum!]
  ) {
    searchPlaces(term: $searchTerm, types: $types, country: $country) {
      language
      placeName
      mbId
      placeType
      placeContext
      center
      relevance
      text
    }
  }
`;

export default function searchPlaces({
  apollo,
  searchTerm,
  country,
  types = ['district', 'place', 'locality', 'poi']
}) {
  return apollo.query({
    query,
    variables: {
      searchTerm,
      country,
      types
    }
  });
}
