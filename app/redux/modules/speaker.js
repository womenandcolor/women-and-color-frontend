// NPM
import { map, compact, uniqBy } from 'lodash';
import { equals } from 'ramda';
import { push } from 'react-router-redux';
import axios from 'axios';

// App
import {
  BASE_URL_PATH,
  IDENTITIES,
  DEFAULT_SPEAKER_LIMIT,
} from 'appHelpers/constants';
import { generateQueryString } from 'appHelpers/queryParams';
import { speakerToNamePath, speakerToProfilePath } from 'appHelpers/url';
import { showNotification } from './notification';
import { getApiToken } from './user'

const MODULE_NAME = 'SPEAKER';

const GET_SPEAKER = `${MODULE_NAME}/GET_SPEAKER`;
const UPDATE_SPEAKER = `${MODULE_NAME}/UPDATE_SPEAKER`;
const UPDATE_SPEAKERS = `${MODULE_NAME}/UPDATE_SPEAKERS`;
const UPDATE_SPEAKERS_START = `${MODULE_NAME}/UPDATE_SPEAKERS_START`;
const UPDATE_SEARCH_PARAMS = `${MODULE_NAME}/UPDATE_SEARCH_PARAMS`;
const UPDATE_SELECTION = `${MODULE_NAME}/UPDATE_SELECTION`;

// Sync Action
export function updateSpeakersStart(append) {
  return { type: UPDATE_SPEAKERS_START, append };
}

export function updateSpeakers(results, append) {
  return { type: UPDATE_SPEAKERS, results, append };
}

export function updateSpeaker(result) {
  return { type: UPDATE_SPEAKER, result };
}

export function updateSearchParams(params) {
  return { type: UPDATE_SEARCH_PARAMS, params };
}

// Async Actions
export function fetchSpeakers(params = {}) {
  const queryStringforApi = generateQueryString({ params, display: false });
  const queryStringforDisplay = generateQueryString({ params, display: true });

  return dispatch => {
    dispatch(updateSpeakersStart(params.append));

    axios
      .get(`${BASE_URL_PATH}/api/v1/profiles?${queryStringforApi}`)
      .then(res => {
        dispatch(push(`?${queryStringforDisplay}`))
        dispatch(updateSpeakers(res.data, params.append));
      })
      .catch(err => console.log(err));
  };
}

export function getSpeaker(id, fullName = '') {
  return dispatch => {
    axios
      .get(`${BASE_URL_PATH}/api/v1/profiles/${id}`)
      .then(res => {
        console.log('res', res)
        dispatch(updateSpeaker(res.data));
        if (!equals(fullName, speakerToNamePath(res.data))) {
          const speakerProfilePath = speakerToProfilePath(res.data);
          dispatch(push(speakerProfilePath));
        }
      })
      .catch(err => {
        console.log('err', err)
        dispatch(showNotification('This profile is not available.'))
        dispatch(push('/'))
      });
  };
}

// Reducer
const INITIAL_STATE = {
  results: [],
  endOfResults: false,
  searchParams: { offset: 0, limit: DEFAULT_SPEAKER_LIMIT },
  selectedLocation: null,
  selectedIdentity: IDENTITIES[0].label,
  speaker: null,
  isLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SPEAKERS_START: 
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_SPEAKERS:
      if (action.append) {
        return {
          ...state,
          results: uniqBy(state.results.concat(action.results), 'id'),
          endOfResults: action.results.length < DEFAULT_SPEAKER_LIMIT,
          isLoading: false,
        };
      }
      return {
        ...state,
        results: uniqBy(action.results, 'id'),
        endOfResults: action.results.length < DEFAULT_SPEAKER_LIMIT,
        isLoading: false,
      };
    case UPDATE_SPEAKER:
      return {
        ...state,
        speaker: action.result,
      };
    case UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.params,
        },
      };
    default:
      return state;
  }
};
