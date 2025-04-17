import gql from 'graphql-tag';

const mutation = gql`
  mutation unsubscribe($email: String!) {
    unsubscribe(input: { email: $email }) {
      result
    }
  }
`;

export default function unsubscribe({ apollo, email }) {
  return apollo.mutate({
    mutation,
    variables: {
      email
    }
  });
}
