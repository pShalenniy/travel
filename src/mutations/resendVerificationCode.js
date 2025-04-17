import gql from 'graphql-tag';

const mutation = gql`
  mutation resendVerificationCode($uId: String!) {
    resendVerificationCode(input: { uId: $uId }) {
      user {
        id
        userId
        firstName
        lastName
        email
        authenticationToken
        userStatus
      }
      errors
      clientMutationId
      success
    }
  }
`;

export default function resendVerificationCode({ apollo, uId }) {
  return apollo.mutate({
    mutation,
    variables: {
      uId
    }
  });
}
