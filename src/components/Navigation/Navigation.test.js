import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import Navigation from './Navigation';

configure({ adapter: new Adapter() });

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
