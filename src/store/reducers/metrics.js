import {
  METRICS_REQUEST,
  METRICS_SUCCESS,
  SWITCH_METRIC,
  LAST_MEASUREMENT_RECEIVED,
} from  "../actions/metrics";


const metricsInitialState = {
  isFetching: false,
  results: []
}

const metrics = (state = metricsInitialState, action) => {
  switch (action.type) {
    case METRICS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case METRICS_SUCCESS:
      const results = []
      action.getMetrics.map((metric) => {
        results.push({
          name: metric,
          isActive: false
        })

        return results;
      })
      return Object.assign({}, state, {
        results: results,
        isFetching: false
      })
    case SWITCH_METRIC:
      const updatedResults = state.results.map(metric =>
        metric.name === action.name ? { ...metric, isActive: !metric.isActive } : metric
      )
      return Object.assign({}, state, {results: updatedResults})
    case LAST_MEASUREMENT_RECEIVED:
      const measurement = action.getLastKnownMeasurement;
      const updatedMeasurement = state.results.map(metric =>
        metric.name === measurement.metric ? {...metric, measurement } : metric)
      return Object.assign({}, state, {results: updatedMeasurement})
    default:
      return state
  }
}

export default metrics
