import gql from 'graphql-tag';

const mutation = gql`
  mutation resubscribe($email: String!) {
    resubscribe(input: { email: $email }) {
      result
    }
  }
`;

export default function resubscribe({ apollo, email }) {
  return apollo.mutate({
    mutation,
    variables: {
      email
    }
  });
}
