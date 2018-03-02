import React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from 'material-ui/styles';
import MainContainer from './MainContainer';
import NavigationContainer from '../Navigation/NavigationContainer';

test('renders the MuiThemeProvider wrapper', () => {
  const mainContainer = shallow(<MainContainer />);
  const muiThemeProvider = mainContainer.find(MuiThemeProvider);
  expect(muiThemeProvider.exists()).toBe(true);
});

test('renders a NavigationContainer component', () => {
  const mainContainer = shallow(<MainContainer />);
  const navigationContainer = mainContainer.find(NavigationContainer);
  expect(navigationContainer.exists()).toBe(true);
});
