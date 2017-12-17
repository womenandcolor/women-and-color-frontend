import React, { PropTypes } from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	common: {
		fontFamily: 'var(--font-family-sans-serif)',
		fontSize: 'var(--font-size-base)',
		fontWeight: 'var(--font-weight-light)',
		lineHeight: 'var(--line-height-base)',
		textTransform: 'none',
		padding: 'var(--padding-vertical) var(--padding-horizontal)',
		borderRadius: 'var(--border-radius)'
	},
	primaryButton: {
		color: 'var(--color-inverted-light)',
		backgroundColor: 'var(--color-primary)'
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
