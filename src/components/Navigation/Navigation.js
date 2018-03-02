import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';

function Navigation({ anchorEl, handleClose, handleMenu, loggedIn }) {
  const menuOpen = Boolean(anchorEl);
  const menuItems = [{href: '/about', text: 'About'}];
  const buttonProps = { variant: 'raised', size: 'large', color: 'secondary' };
  let buttonHref
  let buttonText;
  if (loggedIn) {
    buttonHref = '/accounts/logout';
    buttonText = 'Log out';
    menuItems.push({href: '/accounts/logout', text: 'Log out'});
  } else {
    buttonHref = '/accounts/signup';
    buttonText = 'Be a speaker';
    menuItems.push({href: '/accounts/login', text: 'Log in'}, {href: '/accounts/signup', text: 'Register'});
  }
  const appBarStyles = {borderBottom: '1px solid #ccc', boxShadow: 'none'};
  const logoStyles = {fontFamily: 'serif', fontWeight: '500', fontSize: '2em'};

  return (
    <AppBar position="fixed" style={appBarStyles}>
      <Toolbar>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Typography variant="headline" color="inherit" style={logoStyles}>
                  <Link to="/">Women and Color</Link>
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="search"
                  label="Search for speakers or topics"
                  type="search"
                  margin="normal"
                  style={{width: 250}}
                />
              </Grid>
              <Grid item>
                <Link to={buttonHref}><Button {...buttonProps}>{buttonText}</Button></Link>
              </Grid>
              <Grid item>
                <IconButton
                  aria-owns={menuOpen ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleClose}
                >
                  { menuItems.map((props, i) => <NavMenuItem {...props} handleClose={handleClose} key={i} />) }
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

function NavMenuItem({handleClose, href, text}) {
  return (
    <MenuItem onClick={handleClose} component={Link} to={href}>
      {text}
    </MenuItem>
  );
}

export default Navigation;
