// Project
import React, { Component }  from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
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
import {
  onChange as onChangeProfile
} from 'appRedux/modules/profile';
import {
  get as fetchLocations,
} from 'appRedux/modules/location';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import {
  showNotification,
  hideNotification
} from 'appRedux/modules/notification';
import css from './styles.css';

const CURRENT_PAGE = 'registration';

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
              value={props.profile && props.profile.city || props.locations && props.locations[0].id || ''}
              onChange={ generateHandlerProfile('city') }
              input={<Input name="city" id="city" />}
            >
            {
              props.locations && props.locations.map((location, index) => (
                <MenuItem key={index} value={location.id}>{location.city}</MenuItem>
              ))
            }
          </Select>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="First Name" onChange={ generateHandlerUser('first_name') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Last Name" onChange={ generateHandlerUser('last_name') } />
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


class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.props.fetchLocations()
    this.props.onChangeUser({ page: CURRENT_PAGE });
    this.props.onChangeProfile({ page: CURRENT_PAGE });
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
          handleProfileInputChange={(field, value) => {
            this.props.onChangeProfile({ [field]: value })
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
    profile: state.profile,
    locations: state.location.locations,
    notification: state.notification.message
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onChangeUser: (attrs) => {
      dispatch(onChangeUser(attrs))
    },
    onChangeProfile: (attrs) => {
      dispatch(onChangeProfile(attrs))
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
    submitForm: (user, profile, page) => {
      dispatch(submitForm(user, page));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
