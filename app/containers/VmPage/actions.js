/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  PAGE_VM_QUERY_LIST_START,
  PAGE_VM_QUERY_LIST_SUCCESS,
  PAGE_VM_QUERY_FAILED,
  PAGE_VM_UPDATE_LIST
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function queryListStart(msg, windowUuid) {
  return {
    type: PAGE_VM_QUERY_LIST_START,
    payload: {
      msg
    }
  };
}

export function queryListSuccess(msg) {
  return {
    type: PAGE_VM_QUERY_LIST_SUCCESS,
    msg
  };
}

export function queryListFailed(msg) {
  return {
    type: PAGE_VM_QUERY_FAILED,
    msg
  };
}

export function pageVmUpdateList(items) {
  return {
    type: PAGE_VM_UPDATE_LIST,
    items
  };
}

export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_NAME = 'SET_NAME'
 
export function showModal(message) {
  return {
    type: SHOW_MODAL,
    message
  }
}
 
export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}
 
export function setName(name) {
  return {
    type: SET_NAME,
    name
  }
}
 
export function setNameAndHideModal(name) {
  return dispatch => {
    if (!name || name.trim() === '') return
    dispatch(setName(name))
    dispatch(hideModal())
  }
}