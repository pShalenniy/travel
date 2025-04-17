import gql from 'graphql-tag';

const query = gql`
  query bookingHotelFacilityTypes {
    bookingHotelFacilityTypes {
      facilityTypes
      hotelFacilityTypes
    }
  }
`;

export default function bookingHotelFacilityTypes({ apollo }) {
  return apollo.query({
    query,
    variables: {}
  });
}
