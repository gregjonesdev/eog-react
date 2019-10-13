import {
  METRICS_REQUEST,
  METRICS_FAILURE,
  METRICS_SUCCESS,
  SWITCH_METRIC,
  LAST_MEASUREMENT_RECEIVED,
} from  "../actions/metrics";


// const metricsSuccess = (state, action) => {
//   const { getMetrics } = action;
//   return getMetrics;
// }

// const handlers = {
//   [actions.METRICS_SUCCESS]: metricsSuccess
// };

// export default (state = initialState, action) => {
//   console.log('212121')
//   console.log(action)
//
//   const handler = handlers[action.type];
//   console.log(handler)
//   if (typeof handler === "undefined") return state;
//   return handler(state, action);
// };

const metricsInitialState = {
  isFetching: false,
  results: []
}

// const metricInitialState = {
//   name: '[Unknown Name]',
//   isActive: false
// }


const metrics = (state = metricsInitialState, action) => {
  console.log('metrics reducer')
  console.log(action.type)

  switch (action.type) {
    case METRICS_REQUEST:
      console.log('metrics request time')
      return Object.assign({}, state, {
        isFetching: true
      })
    case METRICS_SUCCESS:
      console.log('metrics success time')
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

      return Object.assign({}, state, state.results = updatedResults)
    case LAST_MEASUREMENT_RECEIVED:
      console.log('reducer last msmt recd')
    default:
      return state
  }
}

export default metrics
