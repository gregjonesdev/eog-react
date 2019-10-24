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


<TestChild></TestChild>
);
