import React from 'react';
import PropTypes from 'prop-types';

const MetricSwitch = ({ name }) => (
  <li>{ name }</li>
)

MetricSwitch.propTypes = {
  onClick: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired
}

export default MetricSwitch
