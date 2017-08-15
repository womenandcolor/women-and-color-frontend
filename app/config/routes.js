import React from 'react'
import { BrowserRouter as Router, browserHistory as history, Route, Switch, IndexRoute } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers'

const routes = (
  <Router history={history}>
    <MainContainer>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
    </Switch>
    </MainContainer>
  </Router>
)

export default routes
