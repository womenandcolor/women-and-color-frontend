import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { link, navTitle} from './styles.css'
import StyledButton from '../Common/StyledButton'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = {
  root: {
    width: '100%',
    backgroundColor: 'var(--color-inverted-light)',
    color: 'var(--color-grey)'
  },
  flex: {
    flex: 1,
  }
};

class Navigation extends React.Component {
  state = {
    auth: this.props.isAuthed,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar>
            <Link to='/' className={classes.flex} style={{textDecoration: 'none'}}>
              <h1 className={navTitle}>
                Women & Color
              </h1>
            </Link>
            {
              auth ? <StyledButton>Log out</StyledButton> : <StyledButton component={Link} to="/register">Be a speaker</StyledButton>
            }
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="default"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link className={link} to='/about'>{'About'}</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link className={link} to='/register'>{'Register'}</Link>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
