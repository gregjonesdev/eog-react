import React from "react";
import { useSelector } from "react-redux";
import Box from "./Box";
import Grid from '@material-ui/core/Grid';



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
        return metric.isActive ? <Box key={ index } metric={metric.name} /> : null
      }) }
    </Grid>
  );
};
