// NPM
import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux'

// App
import { link, navTitle } from './styles.css';
import StyledButton from 'appCommon/StyledButton';
import SearchField from './SearchField';
import Logo from 'svg-react-loader?name=Logo!../../assets/logo_women_and_color.svg';

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

  renderNavLinksAuthentication = () => {
    if (this.props.user.id) {
      return (
        <div>
          <MenuItem onClick={this.handleClose}>
            <a className={link} href='/accounts/logout'>{'Logout'}</a>
          </MenuItem>
        </div>
      )
    } else {
      return (
        <div>
          <MenuItem onClick={this.handleClose}>
            <a className={link} href='/accounts/login'>{'Login'}</a>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <a className={link} href='/accounts/signup'>{'Register'}</a>
          </MenuItem>
        </div>
      )
    }
  };

  render() {
    const { classes, showSearch } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar>
            <Grid container justify="center">
              <Grid item xs={8}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={3}>
                    <a href='/' className={classes.flex} style={{textDecoration: 'none'}}>
                      <Logo className={navTitle} height="24px" width="100%" />
                    </a>
                  </Grid>
                  {
                    showSearch &&
                    <Grid item xs={5}>
                      <SearchField updateSearchParams={this.props.updateSearchParams} />
                    </Grid>
                  }
                  <Grid item xs={3}>
                    <Grid container justify="flex-end">
                      {
                        this.props.user.id ? <StyledButton color="primary" href="/accounts/logout">Log out</StyledButton> : <StyledButton color="primary" href="/accounts/signup">Be a speaker</StyledButton>
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
                            <a className={link} href='/#/about'>{'About'}</a>
                          </MenuItem>
                          { this.renderNavLinksAuthentication() }
                        </Menu>
                      </div>
                      </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile
  }
}

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Navigation));
