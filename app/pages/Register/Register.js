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
  updateUserData,
  updateProfileData,
  fetchCities,
  submitForm
} from 'appRedux/modules/registration';
import StyledButton from 'appCommon/StyledButton';
import FormField from 'appCommon/FormField';
import {
  showNotification,
  hideNotification
} from 'appRedux/modules/notification';
import css from './styles.css';


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
              value={props.user && props.user.profile ? props.user.profile.city : props.cities ? props.cities[0].id : '' }
              onChange={ generateHandlerProfile('city') }
              input={<Input name="city" id="city" />}
            >
            {
              props.cities && props.cities.map((city, index) => (
                <MenuItem key={index} value={city.id}>{city.name}</MenuItem>
              ))
            }
          </Select>
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="First Name" onChange={ generateHandlerProfile('firstName') } />
        </FormField>

        <FormField fullWidth className={ css.formControl }>
          <TextField label="Last Name" onChange={ generateHandlerProfile('lastName') } />
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
    this.props.fetchCities()
  }

  saveUserInput = (field, value) => {
    this.props.updateUserData({ [field]: value })
  }

  saveProfileInput = (field, value) => {
    this.props.updateProfileData({ [field]: value })
  }

  render() {
    return(
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!this.props.notification}
          onClose={this.props.closeNotification}
          autoHideDuration={4000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.notification}</span>}
        />
        <Register
          handleSubmit={event => {
            event.preventDefault();
            this.props.submitForm(this.props.user, this.props.page, this.props.history);
          }}
          handleUserInputChange={this.saveUserInput}
          handleProfileInputChange={this.saveProfileInput}
          {...this.props}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.registration.user,
    cities: state.registration.cities,
    notification: state.notification.message
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    updateUserData: (attrs) => {
      dispatch(updateUserData(attrs))
    },
    updateProfileData: (attrs) => {
      dispatch(updateProfileData(attrs))
    },
    showNotification: (message) => {
      dispatch(showNotification(message))
    },
    hideNotification: () => {
      dispatch(hideNotification())
    },
    fetchCities: () => {
      dispatch(fetchCities())
    },
    submitForm: (user, page, history) => {
      dispatch(submitForm(user, page, history));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
