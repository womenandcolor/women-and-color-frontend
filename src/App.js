import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import pink from 'material-ui/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: grey,
    error: pink
  },
  typography: {
    fontFamily: "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif"
  }
});

function App(props) {
  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>);
}

export default App;
