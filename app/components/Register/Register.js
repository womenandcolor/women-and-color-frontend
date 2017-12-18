import React from 'react'
import css from './styles.css'

import TextField from 'material-ui/TextField';
import StyledButton from '../Common/StyledButton';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import FormField from '../Common/FormField'
import { Link } from 'react-router-dom'


const Register = (props) => {

  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  const generateHandlerProfile = (fieldName) => {
    return (event) => { props.handleProfileInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Create your profile</h1>

        <FormField fullWidth className={ css.formControl }>
          <InputLabel htmlFor="speaker-city">City</InputLabel>
          <Select
              value={props.user ? props.user.profile.city : props.cities ? props.cities[0].id : '' }
              onChange={ generateHandlerProfile('city') }
              input={<Input name="city" id="city" />}
            >
            {
              props.cities && props.cities.map((city, index) => (
                <MenuItem key={index} value={city.id}>{city.name}</MenuItem>
              ))
            }
          </Select>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="First Name" onChange={ generateHandlerProfile('firstName') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Last Name" onChange={ generateHandlerProfile('lastName') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Password" type="password" onChange={ generateHandlerUser('password') } />
        </FormField>

        <FormField className={ css.formControl }>
          <StyledButton label="Submit" type="submit">Create profile</StyledButton>
        </FormField>

      </form>
      <div className={ css.loginLink }>
        <Link to='/auth'>{'Already a speaker? Sign in to your profile.'}</Link>
      </div>
    </div>
  )
}


export default Register;