// NPM
import { combineReducers } from "redux";

// App
import { reducer as user } from './modules/user';
import { reducer as profile } from './modules/profile';
import { reducer as location } from './modules/location';
import { reducer as topic } from './modules/topic';
import { reducer as authentication } from './modules/authentication';
import { reducer as notification } from './modules/notification';
import { reducer as speaker } from './modules/speaker';
import { reducer as contactForm } from './modules/contactForm'
import { reducer as featuredTalk } from './modules/featuredTalk';
import { reducer as subscriptionGroup } from './modules/subscriptionGroup';

export default combineReducers({
  user,
  profile,
  location,
  topic,
  authentication,
  notification,
  speaker,
  contactForm,
  featuredTalk,
  subscriptionGroup,
});
