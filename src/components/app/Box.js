import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider, client, useQuery } from "../../core/client";
import LinearProgress from "@material-ui/core/LinearProgress";
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "../../store/actions/metrics"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';


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
  results.map(result => {
      measurements.push(result.measurement)
    }
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
  console.log("Box componenet.....")
  console.log(metric) //tubingPressure

  const dispatch = useDispatch();

  const measurements = useSelector(
    getMeasurements
  );

  console.log('pizza')
  console.log(measurements)
  let latestMeasurement
  measurements.map(item => {
    if (Boolean(item) && item.metric === metric) {
      latestMeasurement = item
    }
  })

  console.log(latestMeasurement)



  const query = buildQuery(metric)
  //
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
            <h3 style={{ padding: "0 10px"}}>{metric.name}</h3>
            <hr/>
            { latestMeasurement ? <div><h1>{latestMeasurement.value}</h1>{latestMeasurement.unit}</div> : <div>"No Data Received"</div>}
          </CardContent>
        </Card>
      </Grid>
  );
};
