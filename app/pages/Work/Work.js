// NPM
import React from 'react';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';

// App
import css from './styles.css';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';

const Work = (props) => {

  const generateHandler = (fieldName) => {
    return (event) => { props.handleProfileInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Let's talk about work</h1>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Position" onChange={ generateHandler('position') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Organization" onChange={ generateHandler('organization') } />
        </FormField>

        <div>
          <FormField className={ css.formControl }>
            <StyledButton label="Submit" type="submit">Save and continue</StyledButton>
          </FormField>
          <FormField className={ css.formControl }>
            <p onClick={ props.handleSubmit } style={{ cursor: 'pointer' }}>Save and exit</p>
          </FormField>
        </div>
      </form>

    </div>
  )
}

export default Work;
