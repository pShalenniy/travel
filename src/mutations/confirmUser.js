import gql from 'graphql-tag';

const mutation = gql`
  mutation confirmUser(
    $uId: String!
    $password: String!
    $callbackUrl: String!
  ) {
    confirmUser(
      input: { uId: $uId, password: $password, callbackUrl: $callbackUrl }
    ) {
      success
      retrievedCallbackUrl
      user {
        id
        userId
        firstName
        lastName
        email
        authenticationToken
        userStatus
      }
    }
  }
`;

export default function confirmUser({ apollo, uId, password, callbackUrl }) {
  return apollo.mutate({
    mutation,
    variables: {
      uId,
      password,
      callbackUrl
    }
  });
}
