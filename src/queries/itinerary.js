import gql from 'graphql-tag';

const query = gql`
  query itineraryFromMagicLink($magicLink: String!) {
    itineraryFromMagicLink(magicLink: $magicLink) {
      totalNights
      startDate
      endDate
      location
      items: itineraryItems {
        canEdit
        canUpdate
        category
        date
        info
        location
        order
        time
        title
      }
    }
  }
`;

export default function itineraryFromMagicLink({ apollo, magicLink }) {
  return apollo.query({
    query,
    variables: {
      magicLink
    }
  });
}
