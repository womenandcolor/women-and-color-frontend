import React from 'react';
import { Route } from 'react-router-dom';
import Grid from 'material-ui/Grid';

// App
import SideBar from './SideBar';
import About from './About/About';
import Account from './Account/Account';

const subroutes = [
  {
    path: 'about',
    text: 'about',
    component: About,
  },
  {
    path: 'account',
    text: 'account',
    component: Account,
  },
];

const EditProfile = ({ match }) => (
  <Grid container spacing={40}>
    <Grid item xs={12} md={3}>
      <SideBar baseUrl={match.url} subroutes={subroutes} />
    </Grid>
    <Grid item xs={12} md={9}>
      {subroutes.map((subroute, index) => (
        <Route
          key={index}
          path={`${match.url}/${subroute.path}`}
          component={subroute.component}
        />
      ))}
    </Grid>
  </Grid>
);

export default EditProfile;
