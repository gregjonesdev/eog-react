import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from '@material-ui/core/Grid';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    margin: "5%"
  }
});

export default ({metric}) => {

  const classes = useStyles();

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
