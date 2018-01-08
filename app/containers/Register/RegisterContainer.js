import React, { Component } from 'react';
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import {
  updateUserData,
  updateProfileData,
  changePage,
  showNotification,
  hideNotification,
  fetchCities,
  submitForm
} from '../../redux/actions'

import { REGISTRATION_FORM_PAGES } from '../../config/constants'

function mapStateToProps(state) {
  return {
    user: state.registration.user,
    cities: state.registration.cities,
    notification: state.notifications.message,
    page: state.registration.page,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUserData: (attrs) => {
      dispatch(updateUserData(attrs))
    },
    updateProfileData: (attrs) => {
      dispatch(updateProfileData(attrs))
    },
    changePage: (page) => {
      dispatch(changePage(page))
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
      dispatch(submitForm(user, page, history))
    }
  }
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

  onSubmitForm = (event) => {
    event.preventDefault();
    this.props.submitForm(this.props.user, this.props.page, this.props.history);
  }


  render() {
    const FormPage = REGISTRATION_FORM_PAGES[this.props.page];

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
        <FormPage
          handleSubmit={this.onSubmitForm}
          handleUserInputChange={this.saveUserInput}
          handleProfileInputChange={this.saveProfileInput}
          {...this.props}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);