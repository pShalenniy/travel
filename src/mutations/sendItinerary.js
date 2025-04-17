import gql from 'graphql-tag';

const mutation = gql`
  mutation sendItinerary(
    $email: String!
    $firstName: String!
    $lastName: String!
    $company: String!
    $itineraryStart: String!
    $itineraryEnd: String!
    $itineraryDestination: String!
  ) {
    sendItinerary(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        company: $company
        itineraryStart: $itineraryStart
        itineraryEnd: $itineraryEnd
        itineraryDestination: $itineraryDestination
      }
    ) {
      result
      success
      errors
    }
  }
`;

export default function({
  apollo,
  firstName,
  lastName,
  email,
  company,
  itineraryStart,
  itineraryEnd,
  itineraryDestination
}) {
  return apollo.mutate({
    mutation,
    variables: {
      firstName,
      lastName,
      email,
      company,
      itineraryStart,
      itineraryEnd,
      itineraryDestination
    }
  });
}
