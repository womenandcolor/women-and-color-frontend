import React from 'react';
import { withRouter } from 'react-router';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import pink from 'material-ui/colors/pink';

import Notification from 'appCommon/Notification/Notification'
import Navigation from 'appCommon/Navigation/Navigation'
import Footer from 'appCommon/Footer/Footer'
import { container, innerContainer } from './styles.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E5E8F4',
      main: '#283CA7',
      dark: '#001777',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f5f5f5',
      main: '#e0e0e0',
      dark: '#757575',
      contrastText: '#000000',
    },
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

const MainContainer = props => (
  <div>
    <MuiThemeProvider theme={theme}>
      <div>
        <CssBaseline />
        <Notification />
        <div className={container}>
          <Navigation location={props.location} />
          <div className={innerContainer}>{props.children}</div>
          <Footer location={props.location} />
        </div>
      </div>
    </MuiThemeProvider>
  </div>
)

export default withRouter(MainContainer)
