import React from 'react'
import css from './styles.css'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';



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

        <FormControl fullWidth className={ css.formControl }>
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
        </FormControl>

        <FormControl fullWidth className={ css.formControl }>
          <TextField label="First Name" onChange={ generateHandlerProfile('firstName') } />
        </FormControl>

        <FormControl fullWidth className={ css.formControl }>
          <TextField label="Last Name" onChange={ generateHandlerProfile('lastName') } />
        </FormControl>

        <FormControl fullWidth className={ css.formControl }>
          <TextField label="Email" onChange={ generateHandlerUser('email') } />
        </FormControl>

        <FormControl fullWidth className={ css.formControl }>
          <TextField label="Password" onChange={ generateHandlerUser('password') } />
        </FormControl>

        <FormControl className={ css.formControl }>
          <Button label="Submit" type="submit">Submit</Button>
        </FormControl>

      </form>
      <div className={ css.loginLink }>
        <Link to='/auth'>{'Already a speaker? Sign in to your profile.'}</Link>
      </div>
    </div>
  )
}


export default Register;