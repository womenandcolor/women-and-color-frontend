import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// App
import {
  Home,
  Page,
  Register,
  Speaker,
  Profile,
  Work,
  Social,
  EditProfile,
  ComingSoon,
  Privacy,
} from 'pages';
import MainContainer from './Main/MainContainer';

import store, { history } from '../redux/store';

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/get-started/profile" component={Profile} />
          <Route path="/get-started/work" component={Work} />
          <Route path="/get-started/social" component={Social} />
          <Route path="/speaker/:id/:fullName?" component={Speaker} />
          <Route path="/profile" component={EditProfile} />
          <Route path="/terms" component={ComingSoon} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/about" component={ComingSoon} />
          <Route path="/thanks" component={ComingSoon} />
          <Route path="/partners" component={ComingSoon} />
          <Route path="/contact" component={ComingSoon} />
        </Switch>
      </MainContainer>
    </Router>
  </Provider>
);

export default routes;
