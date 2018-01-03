import React, { Component } from 'react';
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar';
import { updateUserData, updateProfileData, changePage, showNotification, hideNotification } from '../../redux/actions'
import { Register, Profile, Work, Social } from 'components'

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 0 }
    this.formPages = {
      0: Register,
      1: Profile,
      2: Work,
      3: Social
    }
    this.fetchCities();
  }

  fetchCities = () => {
    fetch('//localhost:1337/api/v1/cities')
    .then(res => res.json())
    .then((cities) => {
      this.setState({ cities, user: { profile: { city: cities[0].id }}})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  saveUserInput = (field, value) => {
    this.props.updateUserData({ [field]: value })
  }

  saveProfileInput = (field, value) => {
    this.props.updateProfileData({ [field]: value })
  }

  submitForm = (event) => {
    event.preventDefault();
    const userExists = !!this.state.user.id;
    const baseUrl = '//localhost:1337/api/v1/users/'
    const method = userExists ? 'PUT' : 'POST';
    const url = userExists ? `${baseUrl}${this.state.user.id}` : baseUrl;
    const user = this.state.user;
    const userData = userExists ? { profile: { user: this.state.user.id, ...this.state.user.profile } } : this.state.user

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
    const FormPage = this.formPages[this.props.page];

    return(
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.notificationOpen}
          onClose={this.props.closeNotification}
          autoHideDuration={4000}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.notificationMessage}</span>}
        />
        <FormPage
          handleSubmit={this.submitForm}
          handleUserInputChange={this.saveUserInput}
          handleProfileInputChange={this.saveProfileInput}
          {...this.state}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.registration.user,
    notification: state.notifications,
    page: state.registration.page
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
    onChangePage: (page) => {
      dispatch(changePage(page))
    },
    showNotification: (message) => {
      dispatch(showNotification(message))
    },
    hideNotification: () => {
      dispatch(hideNotification())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);