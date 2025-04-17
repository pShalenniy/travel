import gql from 'graphql-tag';

const mutation = gql`
  mutation checkoutCart($jsonCart: String!, $clientMutationId: String) {
    checkoutCart(
      input: { jsonCart: $jsonCart, clientMutationId: $clientMutationId }
    ) {
      success
      clientMutationId
      errors
    }
  }
`;

export default function checkoutCart({ apollo, jsonCart, clientMutationId }) {
  return apollo.mutate({
    mutation,
    variables: {
      jsonCart,
      clientMutationId
    }
  });
}
