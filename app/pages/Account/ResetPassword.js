// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom'

// App
import {
  onChange as onChangeUser,
  create as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';

import css from './styles.css';

const CURRENT_PAGE = 'registration';

const Register = (props) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div className={ css.registrationForm }>
      <form onSubmit={ props.handleSubmit }>
        <h1>Create an account</h1>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Password" type="password" onChange={ generateHandlerUser('password1') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Password Confirmation" type="password" onChange={ generateHandlerUser('password2') } />
        </FormField>

        <FormField className={ css.formControl }>
          <StyledButton label="Submit" type="submit" color="primary">Create profile</StyledButton>
        </FormField>

      </form>
    </div>
  )
}


class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.onChangeUser({ page: CURRENT_PAGE });
  }

  render() {
    return(
      <div>
        <Register
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm(this.props.user, CURRENT_PAGE);
          }}
          handleUserInputChange={(field, value) => {
            this.props.onChangeUser({ [field]: value })
          }}
          {...this.props}
        />
        <div className={ css.loginLink }>
          <Link to='/login'>{'Already a speaker? Sign in to your profile.'}</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeUser: (attrs) => {
      dispatch(onChangeUser(attrs))
    },
    fetchLocations: () => {
      dispatch(fetchLocations())
    },
    submitForm: (user, page) => {
      dispatch(submitForm(user, page));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
