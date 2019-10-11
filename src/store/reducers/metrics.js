import * as actions from "../actions/metrics";

const initialState = {
  metrics: [],
}

const metricsSuccess = (state, action) => {
  const { getMetrics } = action;
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
