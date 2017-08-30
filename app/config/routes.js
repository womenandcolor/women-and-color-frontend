import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import createHashHistory from 'history/createHashHistory'
import { AuthenticateContainer, MainContainer, HomeContainer, PageContainer, RegisterContainer, SpeakerContainer } from 'containers'

const history = createHashHistory()

const routes = (
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
)

export default routes
