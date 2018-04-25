// NPM
import React, { PropTypes } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import { connect } from 'react-redux';

// App
import { link, navTitle } from './styles.css';
import SearchField from './SearchField';
import MenuDropdown from './MenuDropdown';
import ButtonMenu from './ButtonMenu';
import Logo from 'svg-react-loader?name=Logo!../../assets/logo_women_and_color.svg';

const styles = {
  root: {
    width: '100%',
    backgroundColor: 'var(--color-inverted-light)',
    color: 'var(--color-grey)',
  },
  flex: {
    flex: 1,
  },
};

const Navigation = props => {
  const loggedOutMenuItems = {
    default: [
      { title: 'Log in', slug: '/accounts/login', color: 'secondary' },
      { title: 'Be a speaker', slug: '/accounts/signup', color: 'primary' },
    ],
  };

  const loggedInMenuItems = profileId => {
    return {
      default: [
        { title: 'Log out', slug: '/accounts/logout', color: 'primary' },
        { title: 'Edit profile', slug: '/profile', color: 'secondary' },
      ],
      '/profile/about': [
        { title: 'Log out', slug: '/accounts/logout', color: 'primary' },
        {
          title: 'View profile',
          slug: `/speaker/${profileId}`,
          color: 'secondary',
        },
      ],
      '/profile/account': [
        { title: 'Log out', slug: '/accounts/logout', color: 'primary' },
        {
          title: 'View profile',
          slug: `/speaker/${profileId}`,
          color: 'secondary',
        },
      ],
    };
  };

  const menuItemsList = (location, user, profile) => {
    const authed = !!user.id;
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
    showSearch,
    updateSearchParams,
    location,
    user,
    profile,
  } = props;
  const menuItems = menuItemsList(location, user, profile);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <Grid container justify="center">
            <Grid item xs={12} sm={10} md={8}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item xs={6} sm={4} md={3}>
                  <a
                    href="/"
                    className={classes.flex}
                    style={{ textDecoration: 'none' }}
                  >
                    <Logo className={navTitle} height="50px" width="100%" />
                  </a>
                </Grid>
                {showSearch && (
                  <Grid item md={5} hidden={{ smDown: true }}>
                    <SearchField updateSearchParams={updateSearchParams} />
                  </Grid>
                )}
                <Grid item xs={6} sm={6} md={4}>
                  <Grid container justify="flex-end">
                    <Hidden smDown>
                      <ButtonMenu menuItems={menuItems} />
                    </Hidden>
                    <Hidden mdUp>
                      <MenuDropdown menuItems={menuItems} />
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

export default connect(mapStateToProps, null)(withStyles(styles)(Navigation));
