import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/metrics";
import { Provider, client, useQuery } from "../../core/client";
import LinearProgress from "@material-ui/core/LinearProgress";

const query = `
  query {
    getMetrics
  }
`;

const getMetrics = state => {
  return state.metrics;
}

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};


const Metrics = () => {
  const dispatch = useDispatch();
  const metrics = useSelector(
    getMetrics
  );

  const [result] = useQuery({query});

  const { fetching, data, error } = result;
  useEffect(
    () => {
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
  if (fetching) return <LinearProgress />;

  return(
    <div>
      metrics
    </div>
  )
}
