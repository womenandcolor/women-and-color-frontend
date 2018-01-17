const MODULE_NAME = 'NOTIFICATION';

const SHOW_NOTIFICATION = `${MODULE_NAME}/SHOW_NOTIFICATION`;
const HIDE_NOTIFICATION = `${MODULE_NAME}/HIDE_NOTIFICATION`;

export function showNotification(message) {
  return { type: SHOW_NOTIFICATION, message }
}

export function hideNotification() {
  return { type: HIDE_NOTIFICATION }
}

export const reducer = (state={}, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        message: action.message
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
}
