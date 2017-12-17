import React, { PropTypes } from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	common: {
		textTransform: 'none',

	},
	primaryButton: {
		color: '#ffffff',
		backgroundColor: '#283CA7'
	}
})

const StyledButton = (props) => {
	const classes = props.classes;
	return(
		<Button className={`${classes.common} ${classes.primaryButton}`}>
			{props.children}
		</Button>
	)
}

export default withStyles(styles)(StyledButton);
