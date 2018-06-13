// NPM
import React from 'react';

// APP
import FullFooter from './FullFooter'
import MiniFooter from './MiniFooter'

const ACCOUNT_PAGES = [
  '/login',
  '/register',
  '/reset-password',
  '/get-started/profile',
  '/get-started/work',
  '/get-started/social',
]

const Footer = props => {
  if (ACCOUNT_PAGES.indexOf(props.location.pathname) > -1) {
    return <MiniFooter />
  }

  return <FullFooter />
}


export default Footer;
