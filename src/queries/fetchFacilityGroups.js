import gql from 'graphql-tag';

const query = gql`
  query {
    fetchFacilityGroups(source: zentrumhub)
  }
`;

export default function fetchFacilityGroups({ apollo }) {
  return apollo.query({
    query,
    variables: {}
  });
}
