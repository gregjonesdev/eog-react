export const METRICS_REQUEST = 'METRICS_REQUEST';
export const METRICS_FAILURE = 'METRICS_FAILURE';
export const METRICS_SUCCESS = 'METRICS_SUCCESS';

export const SWITCH_METRIC = 'SWITCH_METRIC';

export const requestMetrics = () => ({
  type: METRICS_REQUEST,
})

export const receiveMetrics = metrics => ({
  type: METRICS_SUCCESS,
  metrics,
})

export const switchMetric = name => ({
  type: SWITCH_METRIC,
  name
})
