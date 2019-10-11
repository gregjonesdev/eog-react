import React from "react";
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
  <LineChart width={600} height={300} data={data} margin={{ top: 0, right: 5, bottom: 5, left: 0 }}>
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
    margin: "5% 5% 5% 5%"
  }
});

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title="Data" />
      <CardContent>
        {renderLineChart}
      </CardContent>
    </Card>
  );
};
