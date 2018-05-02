// NPM
import ReactDOM from 'react-dom'
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// App
import MiniFooter from 'appCommon/Footer/MiniFooter';
import { container } from './styles.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif"
  }
});


const MainContainer = (props) => (
  <MuiThemeProvider theme={theme}>
    <MiniFooter />
  </MuiThemeProvider>
)

ReactDOM.render(
  <MainContainer />,
  document.getElementById('footer-container')
)
