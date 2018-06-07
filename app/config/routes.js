import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

// App
import {
  Home,
  Page,
  Register,
  Login,
  ResetPassword,
  Speaker,
  Profile,
  Work,
  Social,
  EditProfile,
  ComingSoon,
  Privacy,
  Terms,
  CodeOfConduct,
  PageNotFound
} from 'pages';
import MainContainer from './Main/MainContainer';

import store, { history } from '../redux/store';

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/get-started/profile" component={Profile} />
          <Route path="/get-started/work" component={Work} />
          <Route path="/get-started/social" component={Social} />
          <Route path="/speaker/:id/:fullName?" component={Speaker} />
          <Route path="/profile" component={EditProfile} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/code-of-conduct" component={CodeOfConduct} />
          <Route path="/about" component={ComingSoon} />
          <Route path="/thanks" component={ComingSoon} />
          <Route path="/partners" component={ComingSoon} />
          <Route path="/contact" component={ComingSoon} />
          <Route path='*' exact component={PageNotFound} />
        </Switch>
      </MainContainer>
    </Router>
  </Provider>
);

export default routes;
