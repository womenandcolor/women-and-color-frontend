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

// NOTIFICATIONS ------------------------

export function showNotification(message) {
  return { type: 'SHOW_NOTIFICATION', message }
}

export function hideNotification() {
  return { type: 'HIDE_NOTIFICATION' }
}


