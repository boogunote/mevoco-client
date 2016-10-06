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

// function list(state = initialState, action) {
function list(state = [],
action) {
  switch (action.type) {
    case PAGE_VM_UPDATE_LIST: {
      // return state.set('list', action.items);
      return Object.assign([], state, action.items);
    }
    default:
      return state;
  }
}

import { combineReducers } from 'redux'
import {SHOW_MODAL, HIDE_MODAL, SET_NAME} from './actions'
 
function modals(state = {
  isShowing: false,
  message: ''
}, action) {
 
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        isShowing: true,
        message: action.message
      })
    case HIDE_MODAL:
      return Object.assign({}, state, {
        isShowing: false
      })
    default:
      return state
  }
 
}
 
function name(state = null, action) {
 
  switch (action.type) {
    case SET_NAME:
      return action.name
    default:
      return state
  }
 
}
 
export default combineReducers({
  list,
  modals,
  name
})

// export default vmReducer;
