// NPM
import { combineReducers } from "redux";

// App
import { reducer as user } from 'redux/modules/user';
import { reducer as profile } from 'redux/modules/profile';
import { reducer as location } from 'redux/modules/location';
import { reducer as authentication } from 'redux/modules/authentication';
import { reducer as notification } from 'redux/modules/notification';
import { reducer as speaker } from 'redux/modules/speaker';


export default combineReducers({
  user,
  profile,
  location,
  authentication,
  notification,
  speaker
});
