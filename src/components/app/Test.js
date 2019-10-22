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
import { ssrExchange, Client, defaultExchanges, Subscription, subscriptionExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
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

const newMessages = `
  subscription MessageSub {
    newMessages {
      id
      from
      text
    }
  }
`;


const buildQuery = (metricName) => {
  return `
  query {
      getLastKnownMeasurement(
        metricName: "${ metricName }"
      ) {
      metric
      at
      value
      unit
    }
    }
  `;
}
