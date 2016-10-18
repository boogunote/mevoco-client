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
  PAGE_VM_UPDATE_LIST,
  PAGE_VM_DIALOG_CREATE_VM_UPDATE,
  PAGE_VM_SHOW_DETAIL,
  PAGE_VM_HIDE_DETAIL,
  PAGE_VM_LIST_HIGHLIGHT,
  PAGE_VM_LIST_NORMAL
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
});

// function list(state = initialState, action) {
function list(state = [],
action) {
  switch (action.type) {
    case PAGE_VM_UPDATE_LIST: {
      return Object.assign([], state, action.items);
    }
    case PAGE_VM_LIST_HIGHLIGHT: {
      let newList = Object.assign([], state);
      action.uuidList.forEach(function(uuid) {
        for (var i in newList) {
          if (newList[i].uuid == uuid) {
            newList[i].highlight = true;
            break;
          }
        }
      })
      return newList;
    }
    case PAGE_VM_LIST_NORMAL: {
      let newList = Object.assign([], state);
      action.uuidList.forEach(function(uuid) {
        for (var i in newList) {
          if (newList[i].uuid == uuid) {
            newList[i].highlight = false;
            break;
          }
        }
      })
      return newList;
    }
    default:
      return state;
  }
}

import { combineReducers } from 'redux'
import {SHOW_MODAL, HIDE_MODAL, SET_NAME} from './actions'
 
function modals(state = {
  isShowing: false,
  message: '',
  name: ''
}, action) {
 
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        isShowing: true,
        message: action.message,
        name: state.name
      })
    case HIDE_MODAL:
      return Object.assign({}, state, {
        isShowing: false,
        name: state.name
      })
    case PAGE_VM_DIALOG_CREATE_VM_UPDATE:
      let newState = {};
      newState[action.name] = action.value;
      return Object.assign({}, state, newState)
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

function currItemUuid(state = null, action) {
 
  switch (action.type) {
    case PAGE_VM_SHOW_DETAIL:
      return action.uuid
    case PAGE_VM_HIDE_DETAIL:
      return null
    default:
      return state
  }
 
}
 
export default combineReducers({
  list,
  modals,
  name,
  currItemUuid
})

// export default vmReducer;
