// NPM
import { combineReducers } from "redux";

// App
import { reducer as user } from './modules/user';
import { reducer as profile } from './modules/profile';
import { reducer as location } from './modules/location';
import { reducer as authentication } from './modules/authentication';
import { reducer as notification } from './modules/notification';
import { reducer as speaker } from './modules/speaker';


export default combineReducers({
  user,
  profile,
  location,
  authentication,
  notification,
  speaker
});
