// NPM
import React, { PropTypes } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { connect } from 'react-redux';

// App
import { link } from './styles.css';
import SearchField from './SearchField';
import MenuDropdown from './MenuDropdown';
import ButtonMenu from './ButtonMenu';
import Logo from 'svg-react-loader?name=Logo!../../assets/logo_women_and_color.svg';
import { logout } from 'appRedux/modules/user'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.primary.contrastText,
    color: theme.palette.secondary.dark,
  }
});

const Navigation = props => {
  const loggedOutMenuItems = {
    default: [
      { title: 'Log in', slug: '/login', color: 'secondary' },
      { title: 'Be a speaker', slug: '/register', color: 'primary' },
    ],
  };

  const loggedInMenuItems = profileId => {
    return {
      default: [
        { title: 'Edit profile', slug: '/profile', color: 'primary' },
      ],
      '/profile/about': [
        {
          title: 'View profile',
          slug: `/speaker/${profileId}`,
          color: 'primary',
        },
      ],
      '/profile/talks': [
        {
          title: 'View profile',
          slug: `/speaker/${profileId}`,
          color: 'primary',
        },
      ],
      '/profile/account': [
        {
          title: 'View profile',
          slug: `/speaker/${profileId}`,
          color: 'primary',
        },
      ],
    };
  };

  const menuItemsList = (location, authed, profile) => {
    const menuItemsObj = authed
      ? loggedInMenuItems(profile.id)
      : loggedOutMenuItems;

    if (location && menuItemsObj[location.pathname]) {
      return menuItemsObj[location.pathname];
    }

    return menuItemsObj.default;
  };

  const {
    classes,
    updateSearchParams,
    location,
    user,
    profile,
    logout,
  } = props;

  const authed = !!user.id;
  const menuItems = menuItemsList(location, authed, profile);

  console.log('user', user)

  return (
    <div>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Grid container justify="center" spacing={0}>
            <Grid item xs={12} md={9}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={6} sm={4} md={3}>
                  <a
                    href="/#/"
                    style={{ textDecoration: 'none' }}
                  >
                    <Logo height="50px" width="100%" />
                  </a>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Grid container justify="flex-end">
                    <Hidden smDown>
                      <ButtonMenu menuItems={menuItems} authed={authed} logout={logout} />
                    </Hidden>
                    <Hidden mdUp>
                      <MenuDropdown menuItems={menuItems} authed={authed} logout={logout} />
                    </Hidden>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigation));
