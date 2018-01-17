import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'

// App
import {
  AuthenticateContainer,
  MainContainer,
  HomeContainer,
  PageContainer,
  RegisterContainer,
  SpeakerContainer
} from 'containers'
import store from '../redux/store'


const history = createHashHistory()

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/auth" component={AuthenticateContainer} />
          <Route path="/about" component={PageContainer} />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/speaker" component={SpeakerContainer} />
        </Switch>
      </MainContainer>
    </Router>
  </Provider>
)

export default routes
