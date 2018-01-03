export const auth = (state={}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCESS':
      return { ...state, isLoggedIn: true }
    case 'USER_LOGIN_FAILURE':
      return { ...state, isLoggedIn: false, error: action.error }
    case 'USER_LOGGED_OUT':
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}

export const registration = (state={user: {}}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      const userData = action.userData
      return {
        ...state,
        user: {
          ...state.user,
          ...userData
        }
      }
    case 'UPDATE_PROFILE_DATA':
      const profileData = action.profileData
      return {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            ...profileData
          }
        }
      }
    case 'CHANGE_PAGE':
      return { ...state, page: action.page }
    default:
      return state
  }
}

export const notifications = (state={}, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        message: action.message
      }
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        message: null
      }
  }
}


export const appReducers = (state = {}, action) => {
  return {
    auth: auth(state.auth, action),
    registration: registration(state.registration, action),
    notifications: notifications(state.notifications, action)
  }
}