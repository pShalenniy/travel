import gql from 'graphql-tag';

const query = gql`
  query fetchHotel(
    $hotelExtId: String
    $suggestionId: String
    $source: SuggestionSourceTypeEnum!
  ) {
    fetchHotel(
      hotelExtId: $hotelExtId
      suggestionId: $suggestionId
      source: $source
    ) {
      attribution
      price
      category
      currency
      currencyName
      extId
      hotelFacilities
      id
      itineraryId
      lat
      lng
      moreInfo
      jsonDetailedInfo
      detailedInfo
      name
      pictures
      rating
      shortDescription
      slug
      source
      thumbnailUrl
      popularWithColleagues
      address
    }
  }
`;

export default function fetchHotel({
  apollo,
  hotelExtId,
  suggestionId,
  source
}) {
  return apollo.query({
    query,
    variables: {
      hotelExtId,
      suggestionId,
      source
    }
  });
}
