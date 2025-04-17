import gql from 'graphql-tag';

const mutation = gql`
  mutation sendEventToAmplitude($json: String!) {
    sendEventToAmplitude(input: { json: $json }) {
      success
      errors
    }
  }
`;

export default function sendEventToAmplitude({ apollo, json }) {
  return apollo.mutate({
    mutation,
    variables: {
      json
    }
  });
}
