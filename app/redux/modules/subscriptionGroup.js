import axios from 'axios';
// App
import {
  GetRequest, GetSuccess, GetError, PostRequest, PostSuccess, PostError
} from './action_template';
import { BASE_URL_PATH } from 'appHelpers/constants';

const MODULE_NAME = 'subscription_groups';
const ENDPOINT_URL = `${BASE_URL_PATH}/api/v1/${MODULE_NAME}/`;

// Actions
export function getRequest() {
  return {
    type: GetRequest(MODULE_NAME)
  }
}

export function getSuccess(data) {
  return {
    type: GetSuccess(MODULE_NAME),
    data
  }
}

export function getError() {
  return {
    type: GetError(MODULE_NAME)
  }
}

export function postRequest() {
  return {
    type: PostRequest(MODULE_NAME)
  }
}

export function postSuccess(data) {
  return {
    type: PostSuccess(MODULE_NAME),
    data
  }
}

export function postError(error) {
  return {
    type: PostError(MODULE_NAME),
    error
  }
}

// Async Actions
export function get() {
  return dispatch => {
    dispatch(getRequest());

    axios.get(ENDPOINT_URL)
    .then(res => {
      dispatch(getSuccess(res.data));
    })
    .catch(err => {
      dispatch(getError(err));
      console.log(err);
    })
  }
}


const initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false,
  groups: []
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case GetRequest(MODULE_NAME): {
      return {
        ...state,
        isLoading: true,
        isRequesting: true
      }
    }

    case GetSuccess(MODULE_NAME): {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        isRequesting: false,
        groups: action.data
      }
    }

    case GetError(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        isLoading: false,
        error: action.error
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
        groups: [...state.groups].concat(action.data)
      }
    }

    case PostError(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        error: action.error
      }
    }

    default:
      return state
  }
}
