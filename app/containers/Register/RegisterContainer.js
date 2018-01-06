import React, { Component } from 'react';
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import {
  updateUserData,
  updateProfileData,
  changePage,
  showNotification,
  hideNotification,
  fetchCities
} from '../../redux/actions'
import { Register, Profile, Work, Social } from 'components'
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

  submitForm = (event) => {
    event.preventDefault();
    const userExists = !!this.props.user.id;
    const baseUrl = '//localhost:1337/api/v1/users/'
    const method = userExists ? 'PUT' : 'POST';
    const url = userExists ? `${baseUrl}${this.props.user.id}` : baseUrl;
    const user = this.props.user;
    const userData = userExists ? { profile: { user: this.props.user.id, ...this.props.user.profile } } : this.props.user

    fetch(url, {
      method: method,
      body: JSON.stringify(userData)
    }).then(res => res.json())
    .then((data) => {
      if (!!data.id) {
        this.props.showNotification('Your profile has been saved.')
        this.props.changePage(this.props.page + 1)
      } else {
        this.setState({
          notificationOpen: true,
          notificationMessage: data.message
        })
      }
    }).catch((err) => {
      this.props.showNotification('There was an error in saving your profile: ' + err)
      this.setState({
        notificationOpen: true,
        notificationMessage: err
      })
    })
  }

  render() {
    const pageNum = this.props.page || 0
    const FormPage = REGISTRATION_FORM_PAGES[pageNum];

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
          handleSubmit={this.submitForm}
          handleUserInputChange={this.saveUserInput}
          handleProfileInputChange={this.saveProfileInput}
          {...this.props}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);