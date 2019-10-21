import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider, useQuery } from "../../core/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "../../store/actions/metrics"
import { ApolloProvider } from 'react-apollo';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink } from 'apollo-link';
import { split } from 'apollo-link';
import ApolloClient from 'apollo-boost';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { ReduxCache, apolloReducer } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const URL = 'react.eogresources.com';

const MEASUREMENT_SUBSCRIPTION = gql`
  subscription {
      newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

const httpLink = createHttpLink({ uri: `http://${URL}/graphql` });

// Create WebSocket client
export const wsClient = new SubscriptionClient(`ws://${URL}/graphql`, {
  reconnect: true,
  connectionParams: {
    // Pass any arguments you want for initialization
  },
});

const webSocketLink = new WebSocketLink(wsClient);

const requestLink = ({ queryOrMutationLink, subscriptionLink }) =>
  ApolloLink.split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    subscriptionLink,
    queryOrMutationLink,
  );

const link = ApolloLink.from([
  ReduxLink,
  // errorLink,
  requestLink({
    queryOrMutationLink: httpLink,
    subscriptionLink: webSocketLink,
  }),
]);

const client = new ApolloClient()

export default () => {
  return (
    <ApolloProvider client={client}>
      <Test />
    </ApolloProvider>
  );
};

const Test = () => {

  const { data, loading, error } = useSubscription(
    MEASUREMENT_SUBSCRIPTION,
  );

  console.log(error)
  return <h4>New comment: {!loading && data}</h4>;


  return (
      <div>TEst</div>
  );
};
