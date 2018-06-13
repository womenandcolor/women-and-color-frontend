// NPM

import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';

// App

import Navigation from 'appCommon/Navigation/Navigation';
import FullFooter from 'appCommon/Footer/FullFooter';
import { container, innerContainer } from './styles.css';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { parseQueryString } from 'appHelpers/queryParams';


class DefaultTemplate extends React.Component {
  componentWillMount() {
    const parsedParams = parseQueryString(this.props.location.search)
    this.props.updateSearchParams(parsedParams);
  }

  render() {
    return (
      <div className={container}>
        <Navigation showSearch={true} location={this.props.location} />
        <div className={innerContainer}>{this.props.children}</div>
        <FullFooter />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchParams: (params) => {
      dispatch(updateSearchParams(params))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(DefaultTemplate));
