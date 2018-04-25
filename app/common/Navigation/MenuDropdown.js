import React from 'react';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

class MenuDropdown extends React.Component {
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
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={this.state.anchorEl ? 'main-menu' : null}
          aria-haspopup="true"
          onClick={this.handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="main-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.menuItems.map(item => {
            if (item.slug.startsWith('/accounts/')) {
              return (
                <MenuItem
                  button
                  key={item.title}
                  onClick={() => (window.location.href = item.slug)}
                >
                  {item.title}
                </MenuItem>
              );
            } else {
              return (
                <MenuItem
                  button
                  key={item.title}
                  component={Link}
                  to={item.slug}
                  onClick={this.handleClose}
                >
                  {item.title}
                </MenuItem>
              );
            }
          })}
        </Menu>
      </div>
    );
  }
}

export default MenuDropdown;
