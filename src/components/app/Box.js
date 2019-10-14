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

const getMeasurement = state => {
  const results = state.metrics.results;
  if (results.length > 0) {
    results.map(result => {
      if (result.name === "tubingPressure") {
        return result.measurement
      }
    })
  }
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

  useSelector(
    getMeasurement
  );



  const query = buildQuery(metric)
  //
  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;

  console.log(result)
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
            <h1>52</h1>(psi)
          </CardContent>
        </Card>
      </Grid>
  );
};
