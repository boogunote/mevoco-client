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
  VM_LIST_QUERY_START,
  VM_LIST_QUERY_SUCCESS,
  VM_LIST_QUERY_FAILED
} from './constants';

import {
  VM_LIST_UPDATE,
} from '../App/listsConstants'

import {
  VM_LIST_WINDOW_UPDATE,
} from '../App/windowsConstants'

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function queryListStart(msg, windowUuid) {
  return {
    type: VM_LIST_QUERY_START,
    payload: {
      msg,
      windowUuid
    }
  };
}

export function queryListSuccess(msg) {
  debugger
  return {
    type: VM_LIST_QUERY_SUCCESS,
    msg
  };
}

export function queryListFailed(msg) {
  return {
    type: VM_LIST_QUERY_FAILED,
    msg
  };
}

export function updateVmList(items) {
  return {
    type: VM_LIST_UPDATE,
    items
  };
}

export function updateWindowList(uuidList, windowUuid) {
  return {
    type: VM_LIST_WINDOW_UPDATE,
    payload: {
      uuidList,
      windowUuid
    }
  };
}