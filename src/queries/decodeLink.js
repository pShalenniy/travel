import gql from 'graphql-tag';

const query = gql`
  query decodeLink($encodedLink: String!) {
    decodeLink(link: $encodedLink) {
      decodedValue
    }
  }
`;

export default function decodeLink({ apollo, encodedLink }) {
  return apollo.query({
    query,
    variables: {
      encodedLink
    }
  });
}
