import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/metrics";
import { Provider, client, useQuery } from "../../core/client";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import MetricSwitch from "./MetricSwitch";
import CardContent from "@material-ui/core/CardContent";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";


const query = `
  query {
    getMetrics
  }
`;


export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};


const Metrics = () => {
  console.log('Metrics Component')
  const dispatch = useDispatch();
  const [result] = useQuery({query});


  const useStyles = makeStyles({
    card: {
      margin: "0% 1% 5% 1%"
    },
  });

  const classes = useStyles()

  const { fetching, data, error } = result;

  useEffect(
    () => {
      dispatch({ type: actions.METRICS_REQUEST })
      if (error) {
        dispatch({ type: actions.METRICS_FAILURE, error: error.message });
        return;
      }
      if (!data) return;


      const { getMetrics } = data;

      dispatch({ type: actions.METRICS_SUCCESS, getMetrics });
    },
    [dispatch, data, error]
  );

  return(
    <Card className={classes.card}>
      <CardContent>

      <h3 style={{ padding: "0 10px"}}>Metrics</h3>
      <hr/>
      { fetching ?
        <div><h4>Loading Metrics...</h4>
        <LinearProgress /></div> :
        <ul style={{listStyleType: 'none'}}>
          { data.getMetrics.map((metric, index) => (
            <MetricSwitch key={index} name={metric} />
          )) }
        </ul>
        }
        </CardContent>

    </Card>)
}
