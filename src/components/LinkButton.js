import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const LinkButton = ({ active, children, onClick }) => {
  const classes = useStyles();

  if (active) {
    return <Button variant="outlined" disabled className={classes.button}>{children}</Button>
  }

  return (
    <Button
      variant="outlined"
      className={classes.button}
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {children}
    </Button>
  )
}

LinkButton.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default LinkButton
