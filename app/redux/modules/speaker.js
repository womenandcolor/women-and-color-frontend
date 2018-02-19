// NPM
import { map, compact } from 'lodash';

// App
import { BASE_URL_PATH, SPEAKER_SEARCH_PARAMS, IDENTITIES } from 'appHelpers/constants';
import axios from 'appHelpers/axios';

const MODULE_NAME = 'SPEAKER';

const UPDATE_SPEAKERS = `${MODULE_NAME}/UPDATE_SPEAKERS`;
const UPDATE_SEARCH_PARAMS = `${MODULE_NAME}/UPDATE_SEARCH_PARAMS`;
const UPDATE_SELECTION = `${MODULE_NAME}/UPDATE_SELECTION`;


// Sync Action
export function updateSpeakers(results) {
  return { type: UPDATE_SPEAKERS, results }
}

export function updateSearchParams(params) {
  return { type: UPDATE_SEARCH_PARAMS, params }
}

export function updateSelection(selected) {
  return { type: UPDATE_SELECTION, selected }
}


// Async Actions
export function fetchSpeakers(params={}) {
  const queryParams = map(params, (v,k) => {
    if (!!v) {
      return `${k}=${v}`;
    }
  });
  const compacted = compact(queryParams);
  const queryString = compacted.join('&');

  return dispatch => {
    const url = `${BASE_URL_PATH}/api/v1/profiles?${queryString}`;
    console.log(url)
    axios.get(url)
    .then(res => {
      console.log('response', res)
      dispatch(updateSpeakers(res.data))
    })
    .catch(err => console.log(err))
  }
}

// Reducer
const INITIAL_STATE = {
  results: [],
  searchParams: {},
  selectedLocation: null,
  selectedIdentity: IDENTITIES[0].label,
}

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SPEAKERS:
      return {
        ...state,
        results: action.results
      }
    case UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.params
        }
      }
    case UPDATE_SELECTION:
      return {
        ...state,
        ...action.selected
      }
    default:
      return state
  }
}
