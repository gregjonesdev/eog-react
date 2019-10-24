import React from "react";
import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

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


function Measurement() {
  const { data, loading } = useSubscription(
    MEASUREMENT_SUBSCRIPTION
  );

  return <h4>{!loading && data.newMeasurement.value}</h4>
}


export default () => (
  <Measurement />
);
