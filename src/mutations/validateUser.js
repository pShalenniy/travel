import gql from 'graphql-tag';

const mutation = gql`
  mutation validateUser($uId: String!, $verificationCode: String!) {
    validateUser(input: { uId: $uId, verificationCode: $verificationCode }) {
      user {
        id
        userId
        firstName
        lastName
        email
        userStatus
      }
      errors
      success
    }
  }
`;

export default function validateUser({ apollo, uId, verificationCode }) {
  return apollo.mutate({
    mutation,
    variables: {
      uId,
      verificationCode
    }
  });
}
