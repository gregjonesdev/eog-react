import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';

function handleChange(a) {
  console.log(a)
}

const MetricSwitch = ({ name }) => (
  <li>
    <Switch
      
      onChange={handleChange({name})}
      value={name}
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
    { name }
  </li>
)

MetricSwitch.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default MetricSwitch
