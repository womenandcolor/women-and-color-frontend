import React, { PropTypes } from 'react'
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
  common: {
    margin: '1em'
  }
})

const FormField = (props) => {
  const classes = props.classes;
  return(
    <FormControl fullWidth={props.fullWidth} className={`${classes.common}`}>
      {props.children}
    </FormControl>
  )
}

export default withStyles(styles)(FormField);
