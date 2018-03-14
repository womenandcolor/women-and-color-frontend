// NPM
import { map, compact, uniqBy } from "lodash";

// App
import {
  BASE_URL_PATH,
  IDENTITIES,
  DEFAULT_SPEAKER_LIMIT
} from "appHelpers/constants";
import axios from "appHelpers/axios";

const MODULE_NAME = "SPEAKER";

const GET_SPEAKER = `${MODULE_NAME}/GET_SPEAKER`;
const UPDATE_SPEAKER = `${MODULE_NAME}/UPDATE_SPEAKER`;
const UPDATE_SPEAKERS = `${MODULE_NAME}/UPDATE_SPEAKERS`;
const UPDATE_SEARCH_PARAMS = `${MODULE_NAME}/UPDATE_SEARCH_PARAMS`;
const UPDATE_SELECTION = `${MODULE_NAME}/UPDATE_SELECTION`;

// Sync Action
export function updateSpeakers(results, append) {
  return { type: UPDATE_SPEAKERS, results, append };
}

export function updateSpeaker(result) {
  return { type: UPDATE_SPEAKER, result };
}

export function updateSearchParams(params) {
  return { type: UPDATE_SEARCH_PARAMS, params };
}

export function updateSelection(selected) {
  return { type: UPDATE_SELECTION, selected };
}

// Async Actions
export function fetchSpeakers(params = {}) {
  const queryParams = map(params, (v, k) => {
    if (!!v) {
      return `${k}=${v}`;
    }
  });
  const compacted = compact(queryParams);
  const queryString = compacted.join("&");
  console.log('queryString', queryString)

  return dispatch => {
    axios
      .get(`${BASE_URL_PATH}/api/v1/profiles?${queryString}`)
      .then(res => {
        console.log("response", res);
        dispatch(updateSpeakers(res.data, params.append));
      })
      .catch(err => console.log(err));
  };
}

export function getSpeaker(id) {
  return dispatch => {
    axios
      .get(`${BASE_URL_PATH}/api/v1/profiles/${id}`)
      .then(res => {
        dispatch(updateSpeaker(res.data));
      })
      .catch(err => console.log(err));
  };
}

// Reducer
const INITIAL_STATE = {
  results: [],
  searchParams: { offset: 0, limit: DEFAULT_SPEAKER_LIMIT },
  selectedLocation: null,
  selectedIdentity: IDENTITIES[0].label,
  speaker: null
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SPEAKERS:
      if (action.append) {
        return {
          ...state,
          results: uniqBy(state.results.concat(action.results), 'id')
        }
      }
      return {
        ...state,
        results: uniqBy(action.results, 'id')
      };
    case UPDATE_SPEAKER:
      return {
        ...state,
        speaker: action.result
      };
    case UPDATE_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.params
        }
      };
    case UPDATE_SELECTION:
      return {
        ...state,
        ...action.selected
      };
    default:
      return state;
  }
};
