import gql from 'graphql-tag';

const mutation = gql`
  mutation updateUser($userId: String!, $userModifications: JSON!) {
    updateUser(
      input: { userId: $userId, userModifications: $userModifications }
    ) {
      user {
        id
        userId
        firstName
        lastName
        email
        phone
        authenticationToken
      }
      success
      errors
    }
  }
`;

export default function({ apollo, userId, userModifications }) {
  return apollo.mutate({
    mutation,
    variables: {
      userId,
      userModifications
    }
  });
}
