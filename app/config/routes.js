import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

// App
import {
  Home,
  Page,
  Register,
  Login,
  ResetPassword,
  ConfirmResetPassword,
  Speaker,
  Profile,
  Work,
  Social,
  EditProfile,
  AboutUs,
  ComingSoon,
  Privacy,
  Terms,
  CodeOfConduct,
  PageNotFound,
} from 'pages';
import MainContainer from './Main/MainContainer';

import store, { history } from '../redux/store';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const ProtectedRoute = connect(mapStateToProps, null)(({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
})


const routes = (
  <Provider store={store}>
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/accounts/reset/:uid/:token/" component={ConfirmResetPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/get-started/profile" component={Profile} />
          <Route path="/get-started/work" component={Work} />
          <Route path="/get-started/social" component={Social} />
          <Route path="/speaker/:id/:fullName?" component={Speaker} />
          <ProtectedRoute path="/profile" component={EditProfile} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/code-of-conduct" component={CodeOfConduct} />
          <Route path="/about" component={AboutUs} />
          <Route path="/thanks" component={ComingSoon} />
          <Route path="/partners" component={ComingSoon} />
          <Route path="/contact" component={ComingSoon} />
          <Route path="*" exact component={PageNotFound} />
        </Switch>
      </MainContainer>
    </Router>
  </Provider>
)

export default routes;
