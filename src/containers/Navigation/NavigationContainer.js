import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navigation from '../../components/Navigation/Navigation';

class NavigationContainer extends Component {
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
    const { handleClose, handleMenu } = this;
    const { loggedIn } = this.props;
    const props = { anchorEl, handleClose, handleMenu, loggedIn };

    return <Navigation {...props} />;
  }
}

function mapStateToProps(state) {
  // use reselect here later
  const loggedIn = Boolean(state.user && state.user.id);

  return { loggedIn };
}

export default connect(mapStateToProps)(NavigationContainer);
