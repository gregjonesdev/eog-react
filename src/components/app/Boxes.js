import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "../../store/actions/metrics"
import Box from "./Box";
import Grid from '@material-ui/core/Grid';
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

// function GetValue({metric}) => {
//   // const dispatch = useDispatch();
//   return ('a')
//   //
//   // const { data } = useSubscription(
//   //   MEASUREMENT_SUBSCRIPTION
//   // );
//   //
//   // if (data) {
//   //   // const getLastKnownMeasurement = data.newMeasurement;
//   //   // console.log('hooray')
//   //   // dispatch({ type: LAST_MEASUREMENT_RECEIVED, getLastKnownMeasurement });
//   //   return data.newMeasurment
//   // }
// }

export default () => {



  const allMetrics = useSelector(state => state.metrics);
  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      { allMetrics.results.map((metric, index) => {
        return metric.isActive ? <Box key={ index } metric={metric} /> : null
      }) }
    </Grid>
  );
};
