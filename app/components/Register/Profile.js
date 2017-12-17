import React from 'react'
import css from './styles.css'

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import FormField from '../Common/FormField';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import { Link } from 'react-router-dom'



const Profile = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => {
      console.log(event.currentTarget.value)
      debugger;
      props.handleInputChange(fieldName, event.currentTarget.value)
    }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Tell us about you</h1>

        <FormField fullWidth className={ css.formControl }>
          <FormLabel component="legend">Do you identify as a woman?</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={props.user ? props.user.profile.woman : 'true'}
            onChange={generateHandler('woman')}
          >
            <FormControlLabel value='true' control={<Radio />} label="Yes" />
            <FormControlLabel value='false' control={<Radio />} label="No" />
          </RadioGroup>
        </FormField>

      </form>
      <div className={ css.loginLink }>
        <Link to='/auth'>{'Already a speaker? Sign in to your profile.'}</Link>
      </div>
    </div>
  )
}


export default Profile;