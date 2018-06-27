// NPM
import axios from 'axios';
import { push } from 'react-router-redux';
import { map } from 'lodash';

// App
import { registrationFlow, BASE_URL_PATH } from 'appHelpers/constants';
import { showNotification } from './notification';
import {
  GetRequest,
  GetSuccess,
  GetError,
  PostRequest,
  PostSuccess,
  PostError,
  PutRequest,
  PutSuccess,
  PutError,
  OnChange,
} from './action_template';
import {
  get as getProfile,
  getSuccess as getProfileSuccess,
  update as updateProfile,
  logoutSuccess as logoutProfile,
} from 'appRedux/modules/profile';

const TOKEN_STORAGE_KEY = 'wacApiToken';
const MODULE_NAME = 'users';
const ENDPOINT_URL = `${BASE_URL_PATH}/api/v1/${MODULE_NAME}/`;
const REGISTRATION_URL = `${BASE_URL_PATH}/accounts/registration/`;
const LOGIN_URL = `${BASE_URL_PATH}/accounts/login/`;
const LOGOUT_URL = `${BASE_URL_PATH}/accounts/logout/`;
const RESET_PASSWORD_URL = `${BASE_URL_PATH}/accounts/password/reset/`;
const CONFIRM_RESET_PASSWORD_URL = `${BASE_URL_PATH}/accounts/password/reset/confirm/`;
const CHANGE_PASSWORD_URL = `${BASE_URL_PATH}/accounts/password/change/`;
const VERIFY_TOKEN_URL = `${BASE_URL_PATH}/api-verify-token/`;

// Actions
function getRequest() {
  return {
    type: GetRequest(MODULE_NAME),
  };
}

function getSuccess(data) {
  return {
    type: GetSuccess(MODULE_NAME),
    data,
  };
}

function getError() {
  return {
    type: GetError(MODULE_NAME),
  };
}

function postRequest() {
  return {
    type: PostRequest(MODULE_NAME),
  };
}

function postSuccess(data) {
  return {
    type: PostSuccess(MODULE_NAME),
    data,
  };
}

function postError() {
  return {
    type: PostError(MODULE_NAME),
  };
}

function putRequest() {
  return {
    type: PutRequest(MODULE_NAME),
  };
}

function putSuccess(data) {
  return {
    type: PutSuccess(MODULE_NAME),
  };
}

function putError() {
  return {
    type: PutError(MODULE_NAME),
  };
}

function loginSuccess(data) {
  return {
    type: 'LOGIN_SUCCESS',
    data,
  };
}

function logoutSuccess() {
  return {
    type: 'LOGOUT_SUCCESS',
  };
}

function setApiToken(token) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

function removeApiToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function getApiToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function onChange(data) {
  return {
    type: OnChange(MODULE_NAME),
    data,
  };
}

export function validateToken() {
  const token = getApiToken();

  return dispatch => {
    if (token) {
      axios
        .post(VERIFY_TOKEN_URL, {
          token,
        })
        .then(res => {
          dispatch(get());
        })
        .catch(err => {
          dispatch(removeApiToken());
          dispatch(logoutSuccess());
        });
    } else {
      dispatch(logoutSuccess());
    }
  };
}

export function get() {
  return (dispatch, getState) => {
    dispatch(getRequest());
    const token = getApiToken();
    const authHeader = token ? { Authorization: `JWT ${token}` } : {};

    axios
      .get(ENDPOINT_URL, { headers: authHeader })
      .then(res => {
        if (res.data[0]) {
          const data = res.data[0];
          dispatch(getSuccess({...data, isAuthenticated: true }));
          dispatch(getProfileSuccess(data.profile));
          if (data.profile.page)
            dispatch(push(registrationFlow[data.profile.page].next));
        }
      })
      .catch(err => {
        dispatch(getError(err));
        console.log(err);
      });
  };
}

export function create() {
  return (dispatch, getState) => {
    dispatch(postRequest());
    const { user } = getState();
    const page = user.page;

    axios({
      method: 'POST',
      url: REGISTRATION_URL,
      data: user,
      responseType: 'json',
    })
      .then(res => {
        setApiToken(res.data.token);
        dispatch(
          postSuccess({
            ...res.data.user,
            id: res.data.user.pk,
          })
        );
        dispatch(get())
        dispatch(showNotification('Your account has been created.'));
        dispatch(push(registrationFlow[page].next));
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `There was an error in saving your profile. ${errorList.join(
                ' \n '
              )}`
            )
          );
        } else {
          dispatch(postError(err));
        }
      });
  };
}

export function update() {
  return (dispatch, getState) => {
    dispatch(putRequest());
    const { user } = getState();
    const page = user.page;
    const token = getApiToken();
    const authHeader = token ? { Authorization: `JWT ${token}` } : {};

    return axios({
      method: 'PUT',
      url: `${ENDPOINT_URL}${user.id}/`,
      data: user,
      responseType: 'json',
      headers: authHeader,
    })
      .then(res => {
        console.log(res);
        dispatch(
          postSuccess({
            ...res.data,
          })
        );
        dispatch(showNotification('Your account has been updated.'));
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `There was an error in saving your profile. ${errorList.join(
                ' \n '
              )}`
            )
          );
        } else {
          dispatch(putError(err));
        }
      });
  };
}

export function login() {
  return (dispatch, getState) => {
    const { user } = getState();

    axios({
      method: 'POST',
      url: LOGIN_URL,
      data: user,
      responseType: 'json',
    })
      .then(res => {
        setApiToken(res.data.token);
        dispatch(
          loginSuccess({
            user: res.data.user,
            id: res.data.user.pk,
          })
        );
        dispatch(get());
        dispatch(showNotification('Welcome back!'));
        dispatch(push('/'));
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `We were not able to log you in. ${errorList.join(' \n ')}`
            )
          );
        } else {
          dispatch(postError(err));
        }
      });
  };
}

export function logout() {
  return (dispatch, getState) => {
    axios({
      method: 'POST',
      url: LOGOUT_URL,
      responseType: 'json',
    })
      .then(res => {
        removeApiToken();
        dispatch(logoutSuccess());
        dispatch(logoutProfile());
        dispatch(push('/'));
        dispatch(showNotification('You have been logged out of your account.'));
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `We were not able to log you in. ${errorList.join(' \n ')}`
            )
          );
        } else {
          dispatch(postError(err));
        }
      });
  };
}

export function resetPassword() {
  return (dispatch, getState) => {
    const { user } = getState();

    axios({
      method: 'POST',
      url: RESET_PASSWORD_URL,
      data: { email: user.email },
      responseType: 'json',
    })
      .then(res => {
        dispatch(showNotification(res.data.detail));
        dispatch(push('/'));
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `We were not able reset your password. ${errorList.join(' \n ')}`
            )
          );
        } else {
          dispatch(postError(err));
        }
      });
  };
}

export function confirmResetPassword(uid, token) {
  return (dispatch, getState) => {
    const { user } = getState();

    axios({
      method: 'POST',
      url: CONFIRM_RESET_PASSWORD_URL,
      data: { ...user, uid, token },
      responseType: 'json',
    })
      .then(res => {
        dispatch(showNotification(res.data.detail));
        dispatch(push('/'));
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `We were not able reset your password. ${errorList.join(' \n ')}`
            )
          );
        } else {
          dispatch(postError(err));
        }
      });
  };
}

export function changePassword() {
  return (dispatch, getState) => {
    const { user } = getState();
    const token = getApiToken();
    const authHeader = token ? { Authorization: `JWT ${token}` } : {};

    axios({
      method: 'POST',
      url: CHANGE_PASSWORD_URL,
      data: user,
      responseType: 'json',
      headers: authHeader,
    })
      .then(res => {
        dispatch(showNotification(res.data.detail));
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const errorList = map(err.response.data, (v, k) => {
            return `${k}: ${v}`;
          });
          dispatch(
            showNotification(
              `There was an error in updating your password. ${errorList.join(
                ' \n '
              )}`
            )
          );
        } else {
          dispatch(postError(err));
        }
      });
  };
}

const initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false,
  isAuthenticated: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GetRequest(MODULE_NAME): {
      return {
        ...state,
        isLoading: true,
      };
    }

    case GetSuccess(MODULE_NAME): {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        ...action.data,
      };
    }

    case GetError(MODULE_NAME): {
      return {
        ...state,
      };
    }

    case PostRequest(MODULE_NAME): {
      return {
        ...state,
        isRequesting: true,
      };
    }

    case PostSuccess(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        ...action.data,
      };
    }

    case GetError(MODULE_NAME): {
      return {
        ...state,
      };
    }

    case OnChange(MODULE_NAME): {
      return {
        ...state,
        ...action.data,
      };
    }

    case 'LOGIN_SUCCESS': {
      return {
        ...action.data.user,
        id: action.data.id,
        token: action.data.token,
        isAuthenticated: true,
      };
    }

    case 'LOGOUT_SUCCESS': {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
};
