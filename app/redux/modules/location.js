import axios from 'axios';
// App
import {
  GetRequest, GetSuccess, GetError
} from './action_template';
import { BASE_URL_PATH } from 'appHelpers/constants';

const MODULE_NAME = 'locations';
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

// Async Actions
export function get(opts={}) {
  return dispatch => {
    dispatch(getRequest());
    const active = opts.active ? 'active' : ''
    axios.get(`${ENDPOINT_URL}${active}`)
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
  locations: []
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
        locations: action.data
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

    default:
      return state
  }
}
