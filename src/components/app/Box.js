import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider, client, useQuery } from "../../core/client";
import LinearProgress from "@material-ui/core/LinearProgress";

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


const getWeather = state => {
  const { temperatureinFahrenheit, description, locationName } = state.weather;
  return {
    temperatureinFahrenheit,
    description,
    locationName
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
  // const { temperatureinFahrenheit, description, locationName } = useSelector(
  //   getWeather
  // );

  const query = buildQuery(metric)

  const metricName = "tubingPressure"

  const [result] = useQuery({
    query
  });
  const { fetching, data, error } = result;
  useEffect(
    () => {
      if (error) {
        // dispatch({ type: actions.API_ERROR, error: error.message });
        console.log('errrrrror')
        return;
      }
      if (!data) return;
      const { getLastKnownMeasurement } = data;
      console.log(getLastKnownMeasurement)
      // dispatch({ type: actions.WEATHER_DATA_RECEIVED, getWeatherForLocation });
    },
    [dispatch, data, error]
  );

  if (fetching) return <LinearProgress />;


  return (
      <Grid item>
        <Card>
          <CardContent>
            {metric}
          </CardContent>
        </Card>
      </Grid>
  );
};
