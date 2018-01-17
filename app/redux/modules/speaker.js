import axios from 'axios'

const MODULE_NAME = 'SPEAKER';

const UPDATE_SPEAKERS = `${MODULE_NAME}/UPDATE_SPEAKERS`;


// Sync Action
export function updateSpeakers(results) {
  return { type: UPDATE_SPEAKERS, results }
}


// Async Actions
export function fetchSpeakers() {
  return dispatch => {
    axios.get('//localhost:1337/api/v1/profiles')
    .then(res => {
      console.log(res)
      dispatch(updateSpeakers(res.data))
    })
    .catch(err => console.log(err))
  }
}

// Reducer
export const reducer = (state = { results: [] }, action) => {
  switch (action.type) {
    case UPDATE_SPEAKERS:
      return {
        ...state,
        results: action.results
      }
    default:
      return state
  }
}
