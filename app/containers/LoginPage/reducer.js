/*
 * HomeReducer
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
  LOGIN_BY_ACCOUNT,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  session: null,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_BY_ACCOUNT:

      // Delete prefixed '@' from the github username
      return state
        .set('session', action.session);
    default:
      return state;
  }
}

export default loginReducer;
