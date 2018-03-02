import React from 'react';
import ReactDOM from 'react-dom';
import MainContainer from './MainContainer';

test('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MainContainer>
      <div>Home</div>
    </MainContainer>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
