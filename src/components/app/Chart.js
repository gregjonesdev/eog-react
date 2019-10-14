import React from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
//
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
//
const renderLineChart = (
  // <LineChart width={800} height={300} data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
  //   <Line type="monotone" dataKey="uv" stroke="#347B98" />
  //   <Line type="monotone" dataKey="pv" stroke="#66B032" />
  //   <Line type="monotone" dataKey="amt" stroke="#B2D732" />
  //   <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  //   <XAxis dataKey="name" />
  //   <YAxis yAxisId="1" tickCount={10} tickLine={false} axisLine={false} minTickGap={600} />
  //   <YAxis yAxisId="2" orientation='right' tickCount={10} tickLine={false} axisLine={false} minTickGap={600}/>
  //   <Tooltip />
  // </LineChart>


  <LineChart
    width={800}
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
    <Line yAxisId="1" type="monotone" dataKey="pv" stroke="#347B98" activeDot={{ r: 8 }} />
    <Line yAxisId="2" type="monotone" dataKey="uv" stroke="#66B032" />
    <Line yAxisId="3" type="monotone" dataKey="amt" stroke="#B2D732" />
  </LineChart>
);
//
export default () => {
//
//   console.log('metrics to chart: ')
//   const metrics = useSelector(state => state.metrics);
//   metrics.results.map((metric) => {
//     console.log(metric.name)
//   })
//
  return (
    <Card>
      <CardContent>
        {renderLineChart}
      </CardContent>
    </Card>
  );
};




//
// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';
//
//   render() {
//     return (
//
//     );
//   }
// }
