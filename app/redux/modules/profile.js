// NPM
import { push } from 'react-router-redux'

// App
import {
  GetRequest, GetSuccess, GetError,
  PutRequest, PutSuccess, PutError,
  OnChange
} from './action_template';
import { registrationFlow, BASE_URL_PATH } from 'appHelpers/constants';
import axios from 'appHelpers/axios';
import { showNotification } from './notification';

const MODULE_NAME = 'PROFILE';
const PROFILE_URL = `${BASE_URL_PATH}/api/v1/profiles/`

// Actions
function getRequest() {
  return {
    type: GetRequest(MODULE_NAME)
  }
}

export function getSuccess(profile) {
  return {
    type: GetSuccess(MODULE_NAME),
    profile
  }
}

function getError() {
  return {
    type: GetError(MODULE_NAME)
  }
}

function putRequest() {
  return {
    type: PutRequest(MODULE_NAME)
  }
}

function putSuccess(profile) {
  return {
    type: PutSuccess(MODULE_NAME),
    profile
  }
}

function putError() {
  return {
    type: PutError(MODULE_NAME)
  }
}

export function onChange(data) {
  return {
    type: OnChange(MODULE_NAME),
    data
  }
}

export function update() {
  return (dispatch, getState) => {
    dispatch(putRequest());
    const { profile } = getState();
    const page = profile.page;

    axios({
      method: 'PUT',
      url: `${PROFILE_URL}${profile.id}/`,
      data: profile,
      responseType: 'json'
    }).then(res => {
      dispatch(putSuccess(res.data));
      dispatch(showNotification('Your profile has been updated.'));
      if (page) dispatch(push(registrationFlow[page].next));
    }).catch(err => {
      console.log(err);
      dispatch(putError(err));
    });
  }
}

const initialState = {
  isInitialized: false,
  isLoading: false,
  woman: true,
  poc: true,
  pronouns: 'they'
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
        ...action.profile
      }
    }

    case GetError(MODULE_NAME): {
      return {
        ...state
      }
    }

    case PutRequest(MODULE_NAME): {
      return {
        ...state,
        isLoading: true
      }
    }

    case PutSuccess(MODULE_NAME): {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        ...action.profile
      }
    }

    case PutError(MODULE_NAME): {
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

    default:
      return state
  }
}
