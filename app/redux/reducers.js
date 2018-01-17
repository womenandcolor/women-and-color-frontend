// NPM
import { combineReducers } from "redux";

// App
import { reducer as registration } from './modules/registration';
import { reducer as authentication } from './modules/authentication';
import { reducer as notification } from './modules/notification';
import { reducer as speaker } from './modules/speaker';

export default combineReducers({
  registration,
  authentication,
  notification,
  speaker
});
