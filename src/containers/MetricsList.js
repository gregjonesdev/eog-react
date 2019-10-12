// import { connect } from 'react-redux';
// import Metrics from '../components/app/Metrics';
// import { switchMetric, requestMetrics, receiveMetrics } from '../store/actions/metrics';
//
//
// console.log(requestMetrics)
// const mapStateToProps = state => {
//   console.log('state metrics from container')
//   console.log(state.metrics)
//   return {
//     metrics: state.metrics
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//
//   return {
//     requestMetrics: requestMetrics(),
//     onSwitch: metric => {
//       dispatch(switchMetric(metric))
//     }
//   }
// }
//
// const MetricsList = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Metrics)
//
// export default MetricsList
