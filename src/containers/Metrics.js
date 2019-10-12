import { connect } from 'react-redux';
import Metrics from '../components/app/Metrics';
import { switchMetric, requestMetrics, receiveMetrics } from '../store/actions/metrics';


const mapStateToProps = state => {
  console.log('hi')
  return {
    metrics: state.metrics
  }
}

const mapDispatchToProps = dispatch => {

  return {
    requestMetrics: () => {
      dispatch(requestMetrics())
    },
    onSwitch: metric => {
      dispatch(switchMetric(metric))
    }
  }
}

const MetricsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics)

export default MetricsList
