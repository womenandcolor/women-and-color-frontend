import React from 'react';
import { shallow } from 'enzyme';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Navigation from './Navigation';

const LOGGED_IN_PROPS = { loggedIn: true };
const LOGGED_OUT_PROPS = { loggedIn: false };

test('renders "Log out" button when user is logged in', () => {
  const nav = shallow(<Navigation {...LOGGED_IN_PROPS} />);
  const buttonHTML = nav.find(Button).html();
  expect(buttonHTML).toContain('Log out');
});

test('renders "Be a speaker" button when user not logged in', () => {
  const nav = shallow(<Navigation {...LOGGED_OUT_PROPS} />);
  const buttonHTML = nav.find(Button).html();
  expect(buttonHTML).toContain('Be a speaker');
});
