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
  const { metric, at, value, unit } = state.weather;
  return {
    metric,
    at,
    value,
    unit
  };
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
  const { metric2, at2, unit2, value2 } = useSelector(
    getMeasurement
  );

  const query = buildQuery(metric)

  const metricName = "tubingPressure"

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
      console.log('8888888888')
      console.log(getLastKnownMeasurement)
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
