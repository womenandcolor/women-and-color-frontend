import axios from 'axios'

// AUTHENTICATION ------------------------

export function userLoginSuccess() {
  return { type: 'USER_LOGIN_SUCCESS' }
}

export function userLoginFailure() {
  return { type: 'USER_LOGIN_FAILURE' }
}

export function userLoggedOut() {
  return { type: 'USER_LOGGED_OUT' }
}

// REGISTRATION ------------------------

export function updateUserData(userData) {
  return { type: 'UPDATE_USER_DATA', userData }
}

export function updateProfileData(profileData) {
  return { type: 'UPDATE_PROFILE_DATA', profileData }
}

export function changePage(page) {
  return { type: 'CHANGE_PAGE', page }
}

export function updateCities(cities) {
  return { type: 'UPDATE_CITIES', cities }
}

export function fetchCities() {
  return dispatch => {
    axios.get('//localhost:1337/api/v1/cities')
    .then(res => {
      console.log('CITIES', res.data)
      dispatch(updateCities(res.data))
      dispatch(updateProfileData({ city: res.data[0].id }))
    })
    .catch(err => console.log(err))
  }
}

export function submitForm(user, page, history) {
  return dispatch => {
    const userExists = !!user.id;
    const baseUrl = '//localhost:1337/api/v1/users/'
    const method = userExists ? 'PUT' : 'POST';
    const url = userExists ? `${baseUrl}${user.id}` : baseUrl;
    const userData = userExists ? { profile: { user: user.id, ...user.profile } } : user

    axios({
      method: method,
      url: url,
      data: userData,
      responseType: 'json'
    }).then((res) => {
      if (res.status === 201) {
        dispatch(updateUserData({id: res.data.id}))
        dispatch(changePage(page + 1))
        dispatch(showNotification('Your profile has been created.'))
      } else if (res.status === 200 && page === 3) {
        dispatch(changePage(0))
        history.push('/')
      } else if (res.status === 200) {
        dispatch(showNotification('Your profile has been updated.'))
      } else {
        console.log(res)
        dispatch(showNotification('Your profile was not saved'))
      }
    }).catch((err) => {
      dispatch(showNotification('There was an error in saving your profile: ' + err))
    })
  }
}

// NOTIFICATIONS ------------------------

export function showNotification(message) {
  return { type: 'SHOW_NOTIFICATION', message }
}

export function hideNotification() {
  return { type: 'HIDE_NOTIFICATION' }
}


