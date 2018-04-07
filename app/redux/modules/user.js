// NPM
import { push } from 'react-router-redux';
import lodash from 'lodash';

// App
import { registrationFlow, BASE_URL_PATH } from 'appHelpers/constants';
import axios from 'appHelpers/axios';
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
  getSuccess as getProfileSuccess,
  update as updateProfile,
} from 'appRedux/modules/profile';

const MODULE_NAME = 'users';
const ENDPOINT_URL = `${BASE_URL_PATH}/api/v1/${MODULE_NAME}/`;

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

export function onChange(data) {
  return {
    type: OnChange(MODULE_NAME),
    data,
  };
}

export function get() {
  return dispatch => {
    dispatch(getRequest());

    axios
      .get(ENDPOINT_URL)
      .then(res => {
        if (res.data[0]) {
          const data = res.data[0];
          dispatch(getSuccess(data));
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
      url: ENDPOINT_URL,
      data: user,
      responseType: 'json',
    })
      .then(res => {
        dispatch(postSuccess(res.data));
        dispatch(getProfileSuccess(res.data.profile));
        dispatch(showNotification('The user has been created.'));
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.data) {
          const errorList = lodash.map(err.response.data, (v, k) => {
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
    console.log('update user called');
    dispatch(putRequest());
    const { user } = getState();
    const page = user.page;

    return axios({
      method: 'PUT',
      url: `${ENDPOINT_URL}${user.id}/`,
      data: user,
      responseType: 'json',
    })
      .then(res => {
        dispatch(putSuccess(res.data));
        dispatch(getProfileSuccess(res.data.profile));
        dispatch(showNotification('Your account has been updated.'));
      })
      .catch(err => {
        if (err.response && err.response.data) {
          const errorList = lodash.map(err.response.data, (v, k) => {
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

const initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false,
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

    default: {
      return state;
    }
  }
};
