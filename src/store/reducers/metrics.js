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

// export default (state = initialState, action) => {
//   console.log('212121')
//   console.log(action)
//
//   const handler = handlers[action.type];
//   console.log(handler)
//   if (typeof handler === "undefined") return state;
//   return handler(state, action);
// };




const metrics = (state = {}, action) => {
  switch (action.type) {
    case 'METRICS_SUCCESS':
      console.log('metrics success')
    default:
      return state
  }
}

export default metrics
