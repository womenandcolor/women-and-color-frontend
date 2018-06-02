import React, { PropTypes } from 'react'
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	root: {
		fontFamily: theme.typography.fontFamily,
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '24px',
		textTransform: 'none',
		padding: '8px 16px',
		borderRadius: '4px',
		whiteSpace: 'nowrap',
		marginLeft: '2px',
		marginRight: '2px',
	},
	flatPrimary: {
		color: theme.palette.primary.contrastText,
		backgroundColor: theme.palette.primary.main,

		'&:hover': {
			opacity: 0.6,
			backgroundColor: theme.palette.primary.main,
		  }
	},

	flatSecondary: {
		color: theme.palette.primary.main,
		backgroundColor: theme.palette.primary.contrastText,
		border: `1px solid ${theme.palette.primary.main}`,

		'&:hover': {
			opacity: 0.6,
			backgroundColor: theme.palette.primary.contrastText,
			color: theme.palette.primary.main,
		  }
	},
})

const StyledButton = (props) => {
	return(
		<Button {...props} className={`${props.classes.root} ${props.classes[props.color]} ${props.className}`}>
			{props.children}
		</Button>
	)
}

export default withStyles(styles)(StyledButton);
