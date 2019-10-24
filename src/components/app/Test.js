import React from "react";
import TestChild from "./TestChild";
import gql from 'graphql-tag';
import { Query } from "react-apollo";

const GET_MEASUREMENT = gql`
  query {
      getLastKnownMeasurement(
        metricName: "tubingPressure"
      ) {
      metric
      at
      value
      unit
    }
    }
  `;


export default () => (

  <Query query={GET_MEASUREMENT}>
  {({ data, loading, error, subscribeToMore }) => {
    if (!data) {
      return null;
    }
    if (loading) {
      return <span>Loading...</span>;
    }
    if (error) {
      return <p>Error</p>;
    }

    const { value, unit } = data.getLastKnownMeasurement;

    return <TestChild value={value} unit={unit} subscribeToMore={subscribeToMore}></TestChild>;
  }}
  </Query>
);
