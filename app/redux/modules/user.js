// NPM
import { push } from 'react-router-redux'
import lodash from 'lodash';

// App
import { registrationFlow, BASE_URL_PATH } from 'appHelpers/constants';
import axios from 'appHelpers/axios';
import { showNotification } from './notification';
import {
  GetRequest, GetSuccess, GetError,
  PostRequest, PostSuccess, PostError,
  OnChange
} from './action_template';
import {
  getSuccess as getProfileSuccess,
  update as updateProfile
} from 'appRedux/modules/profile';

const MODULE_NAME = 'USER';
const USER_URL = `${BASE_URL_PATH}/api/v1/users/`;

const UPDATE_USER_DATA = `${MODULE_NAME}/UPDATE_USER_DATA`;
const UPDATE_PROFILE_DATA = `${MODULE_NAME}/UPDATE_PROFILE_DATA`;


// Actions
function getRequest() {
  return {
    type: GetRequest(MODULE_NAME)
  }
}

function getSuccess(user) {
  return {
    type: GetSuccess(MODULE_NAME),
    user
  }
}

function getError() {
  return {
    type: GetError(MODULE_NAME)
  }
}

function postRequest() {
  return {
    type: PostRequest(MODULE_NAME)
  }
}

function postSuccess(user) {
  return {
    type: PostSuccess(MODULE_NAME),
    user
  }
}

function postError() {
  return {
    type: PostError(MODULE_NAME)
  }
}

export function onChange(data) {
  return {
    type: OnChange(MODULE_NAME),
    data
  }
}

export function get() {
  return dispatch => {
    dispatch(getRequest());

    axios.get(USER_URL)
    .then(res => {
      if (res.data) {
        const user = res.data[0];
        dispatch(getSuccess(user));
        dispatch(getProfileSuccess(user.profile));
      }
    })
    .catch(err => {
      dispatch(getError(err));
      console.log(err);
    })
  }
}


export function create() {
  return (dispatch, getState) => {
    dispatch(postRequest());
    const { user } = getState();
    const page = user.page;

    axios({
      method: 'POST',
      url: USER_URL,
      data: user,
      responseType: 'json'
    }).then((res) => {
      dispatch(postSuccess(res.data));
      dispatch(getProfileSuccess(res.data.profile));
      // dispatch(updateProfile());
      if (page) dispatch(push(registrationFlow[page].next));
      dispatch(showNotification('The user has been created.'));
    }).catch((err) => {
      console.log(err);

      if (err.response && err.response.data) {
        const errorList = lodash.map(err.response.data, (v, k) => {
          return `${k}: ${v}`;
        });
        dispatch(showNotification(`There was an error in saving your profile. ${errorList.join(" \n ")}`));
      } else {
        dispatch(postError(err));
      }
    })
  }
}

const initialState = {
    isInitialized: false,
    isLoading: false,
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case GetRequest(MODULE_NAME): {
      return {
        ...state,
        isLoading: true
      }
    }

    case GetSuccess(MODULE_NAME): {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        ...action.user
      }
    }

    case GetError(MODULE_NAME): {
      return {
        ...state
      }
    }

    case PostRequest(MODULE_NAME): {
      return {
        ...state,
        isRequesting: true
      }
    }

    case PostSuccess(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        ...action.user
      }
    }

    case GetError(MODULE_NAME): {
      return {
        ...state
      }
    }

    case OnChange(MODULE_NAME): {
        return {
            ...state,
            ...action.data
        }
    }

    default: {
      return state
    }
  }
}
