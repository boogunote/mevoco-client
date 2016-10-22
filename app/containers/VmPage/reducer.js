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
  PAGE_VM_LIST_NORMAL,
  PAGE_VM_LIST_SET_PAGE_SIZE,
  PAGE_VM_LIST_SET_PAGE_NUMBER,
  PAGE_VM_LIST_SET_ITEM_COUNT,
  PAGE_VM_SHOW_CREATE_VM_DIALOG,
  PAGE_VM_SET_DETAIL_SIDE_PAGE_UUID,
  PAGE_VM_SET_LIST_WINDOW_UUID
} from './constants';

import { fromJS } from 'immutable';

import { combineReducers } from 'redux'

// The initial state of the App
const initialState = fromJS({
});

function listWindowUuid(state = '', action) {
  switch (action.type) {
    case PAGE_VM_SET_LIST_WINDOW_UUID:
      return action.uuid
    default:
      return state
  }
}

export default combineReducers({
  listWindowUuid
})

// export default vmReducer;
