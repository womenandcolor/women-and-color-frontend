// NPM

import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import pink from 'material-ui/colors/pink';

// App

import Navigation from 'appCommon/Navigation/Navigation';
import FullFooter from 'appCommon/Footer/FullFooter';
import { container, innerContainer } from './styles.css';
import { updateSearchParams } from 'appRedux/modules/speaker';
import { parseQueryString } from 'appHelpers/queryParams';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E5E8F4',
      main: '#283CA7',
      dark: '#001777',
      contrastText: '#fff',
    },
    secondary: grey,
    error: pink,
    background: {
      paper: '#FFF',
      default: '#FFF',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
});

class MainContainer extends React.Component {
  componentWillMount() {
    const parsedParams = parseQueryString(this.props.location.search)
    this.props.updateSearchParams(parsedParams);
  }

  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <div className={container}>
            <CssBaseline />
            <Navigation showSearch={true} location={this.props.location} />
            <div className={innerContainer}>{this.props.children}</div>
            <FullFooter />
          </div>
        </MuiThemeProvider>
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

export default withRouter(connect(null, mapDispatchToProps)(MainContainer));
