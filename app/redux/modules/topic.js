import axios from 'axios';
// App
import {
  GetRequest, GetSuccess, GetError, PostRequest, PostSuccess, PostError
} from './action_template';
import { BASE_URL_PATH } from 'appHelpers/constants';
import { getApiToken } from 'appRedux/modules/user';

const MODULE_NAME = 'topics';
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

export function create(topic) {
  return (dispatch, getState) => {
    dispatch(postRequest());
    const token = getApiToken();
    const authHeader = token ? `JWT ${token}` : null;

    axios({
      method: 'POST',
      url: `${ENDPOINT_URL}`,
      data: { topic },
      responseType: 'json',
      headers: {
        'Authorization': authHeader
      }
    }).then(res => {
      console.log('topic post success', res.data)
      dispatch(postSuccess(res.data));
      return res.data
    }).catch(err => {
      console.log(err);
      dispatch(postError(err));
    });
  }
}
const initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false,
  topics: []
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
        topics: action.data
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
        topics: [...state.topics].concat(action.data)
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
