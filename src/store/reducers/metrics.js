import * as actions from "../actions/metrics";

const initialState = {
  metrics: [],
}

const metricsSuccess = (state, action) => {
  console.log("reducer")
  console.log(state)
  console.log(action)
  const { getMetrics } = action;
  console.log(getMetrics)
  return getMetrics;
}

const handlers = {
  [actions.METRICS_SUCCESS]: metricsSuccess
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
