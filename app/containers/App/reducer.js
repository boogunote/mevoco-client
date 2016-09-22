/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOGIN_BY_ACCOUNT,
  SET_WEBSOCKET_CONNECTION,
  REMOTE_API_CALL_START,
  REMOTE_API_CALL_END
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: fromJS({
    repositories: false,
  }),
  apiCalls: {}
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BY_ACCOUNT:
      return state
        .set('session', action.session);
    case SET_WEBSOCKET_CONNECTION:
      return state
        .set('wsconn', action.wsconn)
    case REMOTE_API_CALL_START: {
      var apiCalls = state.get('apiCalls');
      return state.set('apiCalls', apiCalls.set(action.call.id, action.call));
    }
    case REMOTE_API_CALL_END: {
      var apiCalls = state.get('apiCalls');
      return state.set('apiCalls', apiCalls.delete(action.call.id));
    }
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
