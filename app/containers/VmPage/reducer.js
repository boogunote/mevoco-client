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

import { PAGE_VM_UPDATE_LIST } from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
});

function vmReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE_VM_UPDATE_LIST: {
      return state
        .set('list', action.items);
    }
    default:
      return state;
  }
}

export default vmReducer;
