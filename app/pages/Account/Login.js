// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom'
import Card from 'material-ui/Card';

// App
import {
  onChange as onChangeUser,
  login as submitForm
} from 'appRedux/modules/user';
import {
  showNotification,
  hideNotification
} from 'appRedux/modules/notification';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import MinimalTemplate from 'appCommon/templates/MinimalTemplate';
import AccountFormContainer from './AccountFormContainer';

import css from './styles.css';

const Login = (props) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <MinimalTemplate>
      <AccountFormContainer>
        <form onSubmit={ props.handleSubmit }>
          <h1 className={css.title}>Log in</h1>

          <FormField fullWidth>
            <TextField label="Email" type="email" onChange={ generateHandlerUser('email') } />
          </FormField>

          <FormField fullWidth>
            <TextField label="Password" type="password" onChange={ generateHandlerUser('password') } />
          </FormField>

          <Grid container justify="space-between" className={css.actions}>
            <Grid item>
              <Link to={'/reset-password'}>Forgot your password?</Link>
            </Grid>
            <Grid item>
              <StyledButton label="Submit" type="submit" color="primary">Submit</StyledButton>
            </Grid>
          </Grid>

        </form>
      </AccountFormContainer>
      <Grid container justify="center">
        <Grid item xs={11} sm={8} md={5}>
          <p className={css.loginRegisterPrompt}>If you have not created an account yet, then please <Link to="/register">sign up</Link> first.</p>
        </Grid>
      </Grid>
    </MinimalTemplate>
  )
}


class LoginContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!this.props.notification}
          onClose={this.props.hideNotification}
          autoHideDuration={4000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.notification}</span>}
        />
        <Login
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm(this.props.user);
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
    showNotification: (message) => {
      dispatch(showNotification(message))
    },
    hideNotification: () => {
      dispatch(hideNotification())
    },
    fetchLocations: () => {
      dispatch(fetchLocations())
    },
    submitForm: (user) => {
      dispatch(submitForm(user));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
