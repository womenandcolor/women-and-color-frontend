// App
import {
  GetRequest, GetSuccess, GetError
} from './action_template';
import { BASE_URL_PATH } from 'appHelpers/constants';
import axios from 'appHelpers/axios';

const MODULE_NAME = 'LOCATION';

// Actions
export function getRequest() {
  return {
    type: GetRequest(MODULE_NAME)
  }
}

export function getSuccess(locations) {
  return {
    type: GetSuccess(MODULE_NAME),
    locations
  }
}

export function getError() {
  return {
    type: GetError(MODULE_NAME)
  }
}

// Async Actions
export function get() {
  return dispatch => {
    dispatch(getRequest());

    axios.get(`${BASE_URL_PATH}/api/v1/locations/`)
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
  locations: null
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
        locations: action.locations
      }
    }

    case GetError(MODULE_NAME): {
      return {
        ...state
      }
    }

    default:
      return state
  }
}
