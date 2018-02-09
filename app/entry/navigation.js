// NPM
import ReactDOM from 'react-dom'
import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import indigo from 'material-ui/colors/indigo';
import grey from 'material-ui/colors/grey';
import pink from 'material-ui/colors/pink';
import { Provider } from 'react-redux'

// App
import Navigation from 'appCommon/Navigation/Navigation';
import { container, innerContainer } from './styles.css';
import store, { history } from 'appRedux/store'

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


const MainContainer = (props) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div className={container}>
        <Navigation isAuthed={false} />
      </div>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(
  <MainContainer />,
  document.getElementById('navigation-container')
)
