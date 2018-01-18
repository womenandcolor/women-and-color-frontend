import React, { Component } from 'react';

class Authenticate extends Component {
  render () {
    return (
      <div>
        <h1>Authentication</h1>
      </div>
    )
  }
};

class AuthenticateContainer extends Component {
  render () {
    return (
      <Authenticate />
    )
  }
};

export default AuthenticateContainer
