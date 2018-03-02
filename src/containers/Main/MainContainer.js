import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import NavigationContainer from '../../containers/Navigation/NavigationContainer';
import './MainContainer.css';
// want white primary and purple secondary
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#ccc',
      contrastText: '#000',
    },
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
  }
});

function MainContainer(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <NavigationContainer />
      {props.children}
    </MuiThemeProvider>
  );
}

export default MainContainer;
