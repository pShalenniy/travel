import gql from 'graphql-tag';

const mutation = gql`
  mutation setUserPropertiesToAmplitude($json: String!) {
    setUserPropertiesToAmplitude(input: { json: $json }) {
      success
      errors
    }
  }
`;

export default function setUserPropertiesToAmplitude({ apollo, json }) {
  return apollo.mutate({
    mutation,
    variables: {
      json
    }
  });
}
