import { reducer as register } from './modules/register';
import { reducer as authentication } from './modules/authentication';
import { reducer as notification } from './modules/notification';
import { reducer as speaker } from './modules/speaker';

export default combineReducers({
  register,
  authentication,
  notification,
  speaker
});
