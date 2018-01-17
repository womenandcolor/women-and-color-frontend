import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'

// App
import {
  Authenticate, Home, Page, Register,
  Speaker, Profile, Work, Social
} from 'pages';
import MainContainer from 'containers/Main/MainContainer';


import store from '../redux/store'
const history = createHashHistory()

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={Authenticate} />
          <Route path="/about" component={Page} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/work" component={Work} />
          <Route path="/social" component={Social} />
          <Route path="/speaker" component={Speaker} />
        </Switch>
      </MainContainer>
    </Router>
  </Provider>
)

export default routes
