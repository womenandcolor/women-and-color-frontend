import React, { Component } from 'react';


class Page extends Component {
  render () {
    return (
      <div>Custom Page</div>
    )
  }
}

class PageContainer extends Component {
  render () {
    return (
      <Page />
    )
  }
}

export default PageContainer
