import { connect } from 'react-redux';
import Metrics from '../components/app/Metrics';

const mapStateToProps = state => {
  return {
    metrics: getMetrics(state.metrics)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSwitch: metric => [
      return {
        onSwitch: metric => {
          dispatch(toggleMetric(metric))
        }
      }
    ]
  }
}

const MetricsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Metrics)

export const MetricsList
