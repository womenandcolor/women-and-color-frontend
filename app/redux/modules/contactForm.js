// NPM
import { map } from 'lodash';
import axios from 'axios';

// App
import {
  PostRequest, PostSuccess, PostError,
  OnChange
} from './action_template';
import { showNotification } from './notification';
import { BASE_URL_PATH } from 'appHelpers/constants';

const MODULE_NAME = 'contact_form';
const ENDPOINT_URL = `${BASE_URL_PATH}/api/v1/${MODULE_NAME}/`;

// Actions

function postRequest() {
  return {
    type: PostRequest(MODULE_NAME)
  }
}

function postSuccess(data) {
  return {
    type: PostSuccess(MODULE_NAME),
    data
  }
}

function postError(error) {
  return {
    type: PostError(MODULE_NAME),
    error
  }
}

export function onChange(data) {
  return {
    type: OnChange(MODULE_NAME),
    data
  }
}

export function create() {
  return (dispatch, getState) => {
    dispatch(postRequest());
    const { contactForm, speaker } = getState();
    const data = {
      ...contactForm.form,
      profile: speaker.speaker.id
    }

    axios({
      data,
      method: 'POST',
      url: ENDPOINT_URL,
      responseType: 'json'
    }).then(res => {
      console.log(res)
      if (res.errors) {
        return dispatch(showNotification(`${res.errors}`));
      }
      dispatch(showNotification(`Your message will be sent to ${speaker.speaker.first_name}.`));
      dispatch(postSuccess(res.data));
    }).catch(err => {
      console.log(err)
      if (err.response && err.response.data) {
        const errorList = map(err.response.data, (v, k) => {
          return `${k}: ${v}`;
        });
        dispatch(
          showNotification(
            `There was an error submitting your form. ${errorList.join(
              ' \n '
            )}`
          )
        );
      } else {
        dispatch(postError(err));
      }
    });
  }
}

const initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false,
  form: {
    full_name: '',
    email: '',
    event_name: '',
    venue_name: '',
    event_date: '',
    event_time: '',
    speaker_compensation: 0,
    code_of_conduct: 0,
    comments: '',
  }
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case PostRequest(MODULE_NAME): {
      return {
        ...state,
        isRequesting: true
      }
    }

    case PostSuccess(MODULE_NAME): {
      return initialState
    }

    case PostError(MODULE_NAME): {
      return {
        ...state,
        isRequesting: false,
        error: action.error
      }
    }

    case OnChange(MODULE_NAME): {
        return {
            ...state,
            form: {
              ...state.form,
              ...action.data
            }
        }
    }

    default:
      return state
  }
}
