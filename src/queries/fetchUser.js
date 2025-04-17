import gql from 'graphql-tag';

const query = gql`
  query fetchUser($uId: String!) {
    fetchUser(userId: $uId) {
      firstName
      lastName
      email
      userId
      userStatus
    }
  }
`;

export default function fetchUser({ apollo, uId }) {
  return apollo.query({
    query,
    variables: {
      uId
    }
  });
}
