// NPM
import React from 'react';

// App

import Navigation from 'appCommon/Navigation/Navigation';
import MiniFooter from 'appCommon/Footer/MiniFooter';
import { container, innerContainer } from './styles.css';


const MinimalTemplate = props => {
  return (
    <div className={container}>
      <Navigation showSearch={false} />
      <div className={innerContainer}>{props.children}</div>
      <MiniFooter />
    </div>
  )
}

export default MinimalTemplate;
