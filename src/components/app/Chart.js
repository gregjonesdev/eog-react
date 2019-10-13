import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "./CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { makeStyles } from "@material-ui/core/styles";

const data = [
  {name: 'Mon', uv: 400, pv: 2400, amt: 2400},
  {name: 'Tue', uv: 500, pv: 2000, amt: 2800},
  {name: 'Wed', uv: 475, pv: 2200, amt: 2500}, ];

const renderLineChart = (
  <LineChart width={800} height={400} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#347B98" />
    <Line type="monotone" dataKey="pv" stroke="#66B032" />
    <Line type="monotone" dataKey="amt" stroke="#B2D732" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
);

const useStyles = makeStyles({
  card: {
    margin: "1% 1% 5% 1%"
  }
});

export default () => {

  console.log('metrics to chart: ')
  const metrics = useSelector(state => state.metrics);
  metrics.results.map((metric) => {
    console.log(metric.name)
  })

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        {renderLineChart}
      </CardContent>
    </Card>
  );
};
