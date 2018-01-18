const MODULE_NAME = 'AUTHENTICATION';

 const USER_LOGIN_SUCCESS = `${MODULE_NAME}/USER_LOGIN_SUCCESS`;
 const USER_LOGIN_FAILURE = `${MODULE_NAME}/USER_LOGIN_FAILURE`;
 const USER_LOGGED_OUT = `${MODULE_NAME}/USER_LOGGED_OUT`;

// AUTHENTICATION ------------------------
export function userLoginSuccess() {
  return { type: USER_LOGIN_SUCCESS }
}

export function userLoginFailure() {
  return { type: USER_LOGIN_FAILURE }
}

export function userLoggedOut() {
  return { type: USER_LOGGED_OUT }
}


export const reducer = (state={}, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true }

    case USER_LOGIN_FAILURE:
      return { ...state, isLoggedIn: false, error: action.error }

    case USER_LOGGED_OUT:
      return { ...state, isLoggedIn: false }

    default:
      return state
  }
}
