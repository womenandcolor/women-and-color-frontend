import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { container, navContainer, link, speakerButton, searchForSpeaker, navTitle, hamburgerIcon} from './styles.css'
import StyledButton from '../Common/StyledButton'

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <StyledButton raised color="primary" classes='button'>
          {'Be a Speaker'}
      </StyledButton>
    : <StyledButton raised color="primary">
          {'Be a Speaker'}
      </StyledButton>
}

function ActionLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
        <li><Link className={link} to='/'>{'My Profile'}</Link></li>
        <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link className={link} to='/'>{'Home'}</Link></li>
        <li><Link className={link} to='/about'>{'About'}</Link></li>
        <li><Link className={link} to='/register'>{'Register'}</Link></li>
        <li><Link className={link} to='/speaker'>{'Speaker'}</Link></li>
        <li><Link className={link} to='/auth'>{'Log In'}</Link></li>
      </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer} >
        <h1 className={navTitle}>{'Women and Color'}</h1>
        <input className={searchForSpeaker} type="search" placeholder="Search for speakers or topics"/>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />

      </nav>
    </div>
  )
}
