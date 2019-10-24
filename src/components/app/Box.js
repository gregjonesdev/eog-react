import React from "react";
import { useSelector } from "react-redux";
import { Provider, client } from "../../core/client";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';


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

  const measurements = useSelector(
    getMeasurements
  );


  let latestMeasurement
  for (let measurement of measurements) {
    if (measurement.metric===metric.name) {
      latestMeasurement = measurement
    }
  }


  return (
      <Grid item>
        <Card>
          <CardContent>
            <h3 style={{ padding: "0 10px"}}>{metric.name}</h3>
            <hr/>
            { latestMeasurement ?
              <div>
                <h1> {latestMeasurement.value}</h1>
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
