import gql from 'graphql-tag';

const query = gql`
  query fetchInfoAbout($place: String!, $lat: Float, $lng: Float) {
    fetchInfoAbout(
      term: $place
      latitude: $lat
      longitude: $lng
      usingCache: true
    ) {
      description
      extendedName
      id
      images
      latitude
      longitude
      raw
      source
      name
    }
  }
`;

export default function fetchAboutPlace({ apollo, place, lat, lng }) {
  return apollo.query({
    query,
    variables: {
      place,
      lat,
      lng
    }
  });
}
