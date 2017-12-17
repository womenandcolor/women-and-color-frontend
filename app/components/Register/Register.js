import React from 'react'
import css from './styles.css'
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
      <h1>Create your profile</h1>
      <TextField label="City" /><br/>
      <Select
          value="placeholder"
          onChange={ generateHandlerProfile('city') }
          input={<Input name="city" id="speaker-city" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            {
              props.cities && props.cities.map((city, index) => {
                return <MenuItem key={index} value={city.id}>{city.name}</MenuItem>
              })
            }
        </Select>
      <TextField label="First Name" onChange={ generateHandlerProfile('firstName') } /><br/>
      <TextField label="Last Name" onChange={ generateHandlerProfile('lastName') } /><br/>
      <TextField label="Email" onChange={ generateHandlerUser('email') } /><br/>
      <TextField label="Password" onChange={ generateHandlerUser('password') } /><br/><br/>
      <Button label="Submit" onSubmit={ props.handleSubmit }>Submit</Button>

      <div className={ css.loginLink }>
        <Link to='/auth'>{'Already a speaker? Sign in to your profile.'}</Link>
      </div>
    </div>
  )
}


export default Register;