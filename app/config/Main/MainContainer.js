import React from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import indigo from "material-ui/colors/indigo";
import grey from "material-ui/colors/grey";
import pink from "material-ui/colors/pink";
import Navigation from "appCommon/Navigation/Navigation";
import { container, innerContainer } from "./styles.css";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: grey,
    error: pink
  },
  typography: {
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif'
  }
});

const MainContainer = props => (
  <MuiThemeProvider theme={theme}>
    <div className={container}>
      <Navigation />
      <div className={innerContainer}>{props.children}</div>
    </div>
  </MuiThemeProvider>
);

export default MainContainer;
