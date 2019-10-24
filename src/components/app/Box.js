import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider, client, useQuery } from "../../core/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "../../store/actions/metrics"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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

function Measurement({metric}) {
  const { data } = useSubscription(
    MEASUREMENT_SUBSCRIPTION
  );

  if (data && data.newMeasurement.metric ) {
    return <h1>{data.newMeasurement.value}</h1>
  }
  return null;
}

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

const getMeasurements = state => {
  const results = state.metrics.results;
  const measurements = []
  results.map(result => (
      measurements.push(result.measurement)
    )
  )
  return measurements
};

export default ({metric}) => {
  return (
    <Provider value={client}>
      <Box metric={metric}/>
    </Provider>
  );
};

const Box = ({metric}) => {
  const dispatch = useDispatch();

  const measurements = useSelector(
    getMeasurements
  );

  let latestMeasurement
  measurements.map(item => {
    if (Boolean(item) && item.metric === metric) {
      latestMeasurement = item
    }
    return item
  })


  const query = buildQuery(metric)
  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;


  useEffect(
    () => {
      if (error) {
        dispatch({ type: API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      const { getLastKnownMeasurement } = data;
      dispatch({ type: LAST_MEASUREMENT_RECEIVED, getLastKnownMeasurement });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;


  return (
      <Grid item>
        <Card>
          <CardContent>
            <h3 style={{ padding: "0 10px"}}>{metric}</h3>
            <hr/>
            { latestMeasurement ?
              <div>
                <Measurement metric={metric} />
                <span>{latestMeasurement.unit}</span>
              </div> :
              <div>
                <h2>"No Data Received"</h2>
              </div>
            }

          </CardContent>
        </Card>
      </Grid>
  );
};
