import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import { SWITCH_METRIC } from "../../store/actions/metrics";

const MetricSwitch = ( {name} ) => {
  const dispatch = useDispatch();

  return (
    <li style={{margin: 0}}>
      <Switch
        value={name}
        onChange={() => {dispatch({ type: SWITCH_METRIC, name })}}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      { name }
    </li>
  )
}
//
MetricSwitch.propTypes = {
  // onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
}

export default MetricSwitch
