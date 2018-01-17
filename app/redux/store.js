// NPM
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

// App
import appReducers  from '../redux/reducers'

const initialState = {
  authentication: {
    isLoggedIn: false
  }
}

const store = createStore(
  appReducers,
  initialState,
  applyMiddleware(thunk)
);

export default store;
