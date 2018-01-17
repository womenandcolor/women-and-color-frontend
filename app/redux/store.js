// NPM
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';

// App
import appReducer  from '../redux/reducers'

const initialState = { auth: { isLoggedIn: false }}

const store = createStore(
  appReducers,
  initialState,
  applyMiddleware(thunk)
);

export default store;
