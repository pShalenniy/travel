import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import jwt from 'jsonwebtoken';

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  headers: {
    authorization: `Bearer ${jwt.sign(
      { iss: process.env.VUE_APP_JWT_ISSUER },
      `${process.env.VUE_APP_JWT_SECRET}`
    )}`
  }
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.VUE_APP_APOLLO_DEV_TOOLS_ENABLED == 'true'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

// Install the vue plugin
Vue.use(VueApollo);

export default apolloProvider;
