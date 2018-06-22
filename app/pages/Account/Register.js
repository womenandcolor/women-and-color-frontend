// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

// App
import {
  onChange as onChangeUser,
  create as submitForm
} from 'appRedux/modules/user';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import AccountFormContainer from './AccountFormContainer';

import css from './styles.css';

const CURRENT_PAGE = 'registration';

const Register = (props) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <div>
      <AccountFormContainer>
        <form onSubmit={ props.handleSubmit }>
          <h1 className={css.title}>Sign up</h1>

          <FormField fullWidth className={ css.formControl }>
            <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
          </FormField>

          <FormField fullWidth className={ css.formControl }>
            <TextField label="Password" type="password" onChange={ generateHandlerUser('password1') } />
          </FormField>

          <FormField fullWidth className={ css.formControl }>
            <TextField label="Password Confirmation" type="password" onChange={ generateHandlerUser('password2') } />
          </FormField>

          <Grid container justify="space-between" className={css.actions}>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Create profile</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
      <Grid container justify="center">
        <Grid item xs={11} sm={8} md={5}>
          <p className={css.loginRegisterPrompt}>Already have an account? Then please <Link to="/login">sign in</Link>.</p>
        </Grid>
      </Grid>
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
        <Helmet>
          <title>Register</title>
          <meta name="description" content="Register on Women and Color to create a speaker profile for speaking opportunities at tech-related events." />
        </Helmet>
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    notification: state.notification.message
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
