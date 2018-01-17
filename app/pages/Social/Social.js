// NPM
import React from 'react'
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';

// App
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import css from './styles.css'

const Social = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => { props.handleProfileInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Be a little social</h1>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Twitter(optional)" onChange={ generateHandler('twitter') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="LinkedIn(optional)" onChange={ generateHandler('linkedin') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Website(optional)" onChange={ generateHandler('website') } />
        </FormField>

        <div>
          <FormField className={ css.formControl }>
            <StyledButton label="Submit" type="submit">Save and submit</StyledButton>
          </FormField>
        </div>
      </form>

    </div>
  )
}

export default Social;
