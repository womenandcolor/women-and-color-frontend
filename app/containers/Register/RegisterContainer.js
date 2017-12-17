import React, { Component } from 'react'
import { Register, Profile, Work, Social } from 'components'

export default class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { page: 0 }
    this.submitForm = (event) => this._submitForm(event);
    this.saveUserInput = (field, value) => this._saveUserInput(field, value);
    this.saveProfileInput = (field, value) => this._saveProfileInput(field, value);
    this.fetchCities = () => this._fetchCities();
    this.fetchCities();
  }

  _fetchCities() {
    fetch('//localhost:1337/api/v1/cities')
    .then(res => res.json())
    .then((cities) => {
      this.setState({ cities, user: { profile: { city: cities[0].id }}})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  _saveUserInput(field, value) {
    this.setState({
      user: {
        ...this.state.user,
        [field]: value,
      }
    }, console.log(this.state))
  }

  _saveProfileInput(field, value) {
    this.setState({
      user: {
        ...this.state.user,
        profile: {
          ...this.state.user.profile,
          [field]: value
        }
      }
    }, console.log(this.state))
  }

  _submitForm(event) {
    event.preventDefault();
    const userExists = !!this.state.user.id;
    const baseUrl = '//localhost:1337/api/v1/users/'
    const method = userExists ? 'PUT' : 'POST';
    const url = userExists ? `${baseUrl}${this.state.user.id}` : baseUrl;
    const userData = userExists ? { id: this.state.user.id, profile: this.state.user.profile } : this.state.user

    fetch(url, {
      method: method,
      body: JSON.stringify(userData)
    }).then(res => res.json())
    .then((data) => {
      console.log(data)
      this.setState({
        page: this.state.page + 1,
        user:  {
          ...this.state.user,
          id: data.id,
        }})
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    if (this.state.page === 0) {
      return(
        <Register
          handleSubmit={this.submitForm}
          handleUserInputChange={this.saveUserInput}
          handleProfileInputChange={this.saveProfileInput}
          {...this.state}
        />
      )
    } else if (this.state.page === 1) {
      return(
        <Profile
          handleSubmit={this.submitForm}
          handleInputChange={this.saveProfileInput}
        />
      )
    } else if (this.state.page === 2) {
      return(
        <Work
          handleSubmit={this.submitForm}
          handleInputChange={this.saveProfileInput}
        />
      )
    } else if (this.state.page === 3) {
      return(
        <Social
          handleSubmit={this.submitForm}
          handleInputChange={this.saveProfileInput}
        />
      )
    }
  }
}
