// App
import { BASE_URL_PATH, SPEAKER_SEARCH_PARAMS } from 'appHelpers/constants';
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

  return dispatch => {
    axios.get(`${BASE_URL_PATH}/api/v1/profiles`)
    .then(res => {
      dispatch(updateSpeakers(res.data))
    })
    .catch(err => console.log(err))
  }
}

// Reducer
export const reducer = (state = { results: [], searchParams: {} }, action) => {
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
