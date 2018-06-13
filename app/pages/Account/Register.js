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

// App
import {
  onChange as onChangeUser,
  create as submitForm
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

const CURRENT_PAGE = 'registration';

const Register = (props) => {
  const generateHandlerUser = (fieldName) => {
    return (event) => { props.handleUserInputChange(fieldName, event.currentTarget.value) }
  }

  return(
    <MinimalTemplate>
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
    </MinimalTemplate>
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
    showNotification: (message) => {
      dispatch(showNotification(message))
    },
    hideNotification: () => {
      dispatch(hideNotification())
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
