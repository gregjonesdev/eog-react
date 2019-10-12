import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';

const MetricSwitch = ( {name} ) => (
  <li>
    <Switch
      value={name}
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    { name }
  </li>
)
//
MetricSwitch.propTypes = {
  // onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default MetricSwitch
