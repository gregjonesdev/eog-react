import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "../../store/actions/metrics"
import CardContent from "@material-ui/core/CardContent";
import { Provider, client, useQuery } from "../../core/client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import Grid from '@material-ui/core/Grid';


const buildQuery = (metricName) => {
  return `
  query {
      getMeasurements(
        input: {
          metricName: "${ metricName }",
          after: 1571679764726
        }
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
  results.map(result => (
      measurements.push(result.measurement)
    )
  )
  return measurements
};


const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const renderLineChart = (
  <LineChart
    width={1200}
    height={300}
    data={data}
    margin={{
      top: 5, right: 5, left: 5, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis yAxisId="1" />
    <YAxis yAxisId="2" />
    <YAxis yAxisId="3" />
    <Tooltip />
    <Legend />
    <Line yAxisId="1" type="monotone" dataKey="pv" stroke="#347B98" />
    <Line yAxisId="2" type="monotone" dataKey="uv" stroke="#66B032" />
    <Line yAxisId="3" type="monotone" dataKey="amt" stroke="#B2D732" />
  </LineChart>
);

export default () => {
  const today = new Date().valueOf();
  const yesterday = today - 86400000;
  const dispatch = useDispatch();


  console.log('metrics to chart: ')
  const metrics = useSelector(state => state.metrics);
  console.log(metrics)
  metrics.results.map((metric) => {
    console.log(metric.name)
  })

  // const measurements = useSelector(
  //   getMeasurements
  // );
  //
  // let latestMeasurement
  // measurements.map(item => {
  //   if (Boolean(item) && item.metric === metric) {
  //     latestMeasurement = item
  //   }
  //   return item
  // })


  const query = buildQuery("tubingPressure")
  const [result] = useQuery({
    query
  });
  console.log('%')
  console.log(result)
  // const today = new Date().valueOf();
  // const yesterday = today - 86400000;

  const { fetching, data, error } = result;


  useEffect(
    () => {
      if (error) {
        dispatch({ type: API_ERROR, error: error.message });
        return;
      }
      if (!data) return;
      console.log('hi')
      console.log(data)
      // const { getLastKnownMeasurement } = data;
      // dispatch({ type: LAST_MEASUREMENT_RECEIVED, getLastKnownMeasurement });
    },
    [dispatch, data, error]
  );

  // if (fetching) return <LinearProgress />;


  return (
    <Provider value={client}>
      <Card>
        <CardContent>
          {renderLineChart}
        </CardContent>
      </Card>
    </Provider>
  );
};
