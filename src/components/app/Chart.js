import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { LAST_MEASUREMENT_RECEIVED, API_ERROR } from "../../store/actions/metrics"
import { Provider, client, useQuery, useSubscription } from "../../core/client";
import { Subscription } from "urql";
import {
  cacheExchange,
  createClient,
  debugExchange,
  fetchExchange,
} from 'urql';
import { Client, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
// import { ApolloClient } from 'apollo-client;'
import { WebSocketLink } from 'apollo-link-ws';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4001/graphql`,
  options: {
    reconnect: true
  }
});

//
// const networkInterface = createNetworkInterface({ uri:
// 'http://localhost:4000/graphql' });
// networkInterface.use([{
//   applyMiddleware(req, next) {
//     setTimeout(next, 500);
//   },
// }]);
// const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
//   reconnect: true,
// });
// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient,
// );
//
// const client = new ApolloClient({
//   networkInterface: networkInterfaceWithSubscriptions
// });


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

const subscriptionQuery =  `
  subscription{
      newMeasurement{
        metric,
        value,
        at,
        unit
      }
    }
  `;





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
  console.log('default')



  console.log('metrics to chart: ')
  const metrics = useSelector(state => state.metrics);
  metrics.results.map((metric) => {
    console.log(metric.name)
  })

  function HookVersion() {

    const [result] = useQuery({
      query: subscriptionQuery,
    })
    const { fetching, data } = result

    // return fetching ? (
    //   <div className="loader">Loading..</div>
    // ) : (
    //   <div className="json">{JSON.stringify(data, null, 2)}</div>
    // )
    return ( <>{data}</>)
  }



  return (
    <Card>
      <CardContent>
      <HookVersion />
        {renderLineChart}
      </CardContent>
    </Card>
  );
};
