import React, { PropTypes } from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	root: {
		fontFamily: 'var(--font-family-sans-serif)',
		fontSize: 'var(--font-size-base)',
		fontWeight: 'var(--font-weight-light)',
		lineHeight: 'var(--line-height-base)',
		textTransform: 'none',
		padding: 'var(--padding-vertical) var(--padding-horizontal)',
		borderRadius: 'var(--border-radius)',
		whiteSpace: 'nowrap',
		marginLeft: '2px',
		marginRight: '2px',
	},
	flatPrimary: {
		color: 'var(--color-inverted-light)',
		backgroundColor: 'var(--color-primary)',
		
		'&:hover': {
			opacity: 0.6,
			backgroundColor: 'var(--color-primary)',
		  }
	},

	flatSecondary: {
		color: 'var(--color-primary)',
		backgroundColor: 'var(--color-inverted-light)',
		border: '1px solid var(--color-primary)',

		'&:hover': {
			opacity: 0.6,
			backgroundColor: 'var(--color-inverted-light)',
			color: 'var(--color-primary)',
		  }
	},
})

const StyledButton = (props) => {

	return(
		<Button {...props} className={`${props.classes.root} ${props.classes[props.color]}`}>
			{props.children}
		</Button>
	)
}

export default withStyles(styles)(StyledButton);
