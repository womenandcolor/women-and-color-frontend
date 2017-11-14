import React from 'react'
import css from './styles.css'
import { Link } from 'react-router-dom'

const Register = (props) => {

  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  const generateHandlerProfile = (fieldName) => {
    return (event) => { props.handleProfileInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div>
      <div className={ css.registrationForm }>
        <h1>Create your profile</h1>
        <form onSubmit={ props.handleSubmit }>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <select
              className="form-control"
              id="city"
              onChange={ generateHandlerProfile('city') }>
              {
                props.cities && props.cities.map((city, index) => {
                  return <option key={index} value={city.id}>{city.name}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              onChange={ generateHandlerProfile('firstName') }
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              onChange={ generateHandlerProfile('lastName') }
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={ generateHandlerUser('email') }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={ generateHandlerUser('password') }
            />
          </div>
          <button type="submit" className="btn btn-primary">Create profile</button>
        </form>
      </div>
      <div className={ css.loginLink }>
        <Link to='/auth'>{'Already a speaker? Sign in to your profile.'}</Link>
      </div>
    </div>
  )
}

export default Register;