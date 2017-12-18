import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import { Register, Profile, Work, Social } from 'components'

export default class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 0, notificationOpen: false }
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
    this.setState({
      user: {
        ...this.state.user,
        [field]: value,
      }
    }, () => {console.log(this.state)})
  }

  saveProfileInput = (field, value) => {
    this.setState({
      user: {
        ...this.state.user,
        profile: {
          ...this.state.user.profile,
          [field]: value
        }
      }
    }, () => {console.log(this.state)})
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
        this.setState({
          notificationOpen: true,
          notificationMessage: "Success! Your data has been saved.",
          page: this.state.page + 1,
          user:  {
            ...this.state.user,
            id: data.id,
          }})
      } else {
        this.setState({
          notificationOpen: true,
          notificationMessage: data.message
        })
      }
    }).catch((err) => {
      this.setState({
        notificationOpen: true,
        notificationMessage: err
      })
    })
  }

  handleClose = () => {
    this.setState({ notificationOpen: false, notificationMessage: null });
  };

  render() {
    const FormPage = this.formPages[this.state.page];

    return(
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.notificationOpen}
          onClose={this.handleClose}
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
