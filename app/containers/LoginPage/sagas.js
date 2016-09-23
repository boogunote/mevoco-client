/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import {
  push,
  LOCATION_CHANGE
} from 'react-router-redux';
import {
  LOGIN_START,
  LOGIN_SUCCESS
} from './constants';
import { API_CALL_START } from '../App/constants';
import { loginSuccess, loginFailed } from './actions';

import { loginByAccount, setSession } from 'utils/remoteCall';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* loginStart(param) {
  const msg = yield call(loginByAccount, param);

  if (msg.success) {
    setSession(msg.inventory);
    yield put(loginSuccess(msg.inventory));
  } else {
    yield put(loginFailed(msg));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* loginWatcher() {
  while(true) {
    const action = yield take(LOGIN_START)
    yield call(loginStart, action.param);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* login() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(loginWatcher);

  // Suspend execution until location changes
  yield take(LOGIN_SUCCESS);
  yield cancel(watcher);
  yield put(push('/vmlist'));
}

export function* apiCallStart(payload) {
  const msg = yield call(remoteCall, payload);

  console.log(msg)

  // put to store

  // if (msg.success) {
  //   yield put(loginSuccess(msg.inventory));
  // } else {
  //   yield put(loginFailed(msg));
  // }
}

export function* apiCallWatcher() {
  while(true) {
    const action = yield take(API_CALL_START)
    yield call(apiCallStart, action.payload);
  }
}

export function* apiCall() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(apiCallWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  login,
  apiCall
];
