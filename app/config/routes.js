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
} from 'pages';
import MainContainer from './Main/MainContainer';

import store, { history } from '../redux/store';

const routes = (
  <Provider store={store}>
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={Page} />
          <Route path="/get-started/profile" component={Profile} />
          <Route path="/get-started/work" component={Work} />
          <Route path="/get-started/social" component={Social} />
          <Route path="/speaker/:id" component={Speaker} />
          <Route path="/profile/edit" component={EditProfile} />
        </Switch>
      </MainContainer>
    </Router>
  </Provider>
);

export default routes;
