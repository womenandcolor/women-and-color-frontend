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
  },
};

const LoginButton = (props) => (
  <StyledButton color="secondary" href="/accounts/login">Log in</StyledButton>
)

const LogoutButton = (props) => (
  <StyledButton color="primary" href="/accounts/logout">Log out</StyledButton>
)

const SignUpButton = (props) => (
  <StyledButton color="primary" href="/accounts/signup">Be a speaker</StyledButton>
)

const EditProfileButton = (props) => (
  <StyledButton color="secondary" href="/#/profile">Edit profile</StyledButton>
)

const LoggedInMenu = (props) => (
  <div>
    <EditProfileButton {...props} />
    <LogoutButton {...props} />
  </div>
)

const LoggedOutMenu = (props) => (
  <div>
    <LoginButton {...props} />
    <SignUpButton {...props} />
  </div>
)

class Navigation extends React.Component {
  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes, showSearch } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const authed = !!this.props.user.id;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.root}>
          <Toolbar>
            <Grid container justify="center">
              <Grid item xs={12} sm={8}>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item xs={4} sm={3}>
                    <a href='/' className={classes.flex} style={{textDecoration: 'none'}}>
                      <Logo className={navTitle} height="50px" font-size="20px" width="100%" />
                    </a>
                  </Grid>
                  {
                    showSearch &&
                    <Grid item xs={8} sm={5}>
                      <SearchField updateSearchParams={this.props.updateSearchParams} />
                    </Grid>
                  }
                  <Grid item xs={12} sm={4}>
                    <Grid container justify="flex-end">
                      {
                        authed ?
                        <LoggedInMenu /> :
                        <LoggedOutMenu />
                      }
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
