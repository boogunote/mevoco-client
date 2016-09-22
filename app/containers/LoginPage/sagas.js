/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOGIN_START, LOGIN_SUCCESS } from './constants';
import { loginSuccess, loginFailed } from './actions';

import { loginByAccount } from 'utils/remoteCall';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* loginStart() {
  // Select username from store
  // const username = yield select(selectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  // Call our request helper (see 'utils/request')
  const msg = yield call(loginByAccount, {
    accountName: 'admi',
    password: 'password'
  });

  console.log(msg)
  if (msg.success) {
    yield put(loginSuccess(msg));
  } else {
    yield put(loginFailed(msg));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* loginWatcher() {
  while (yield take(LOGIN_START)) {
    yield call(loginStart);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* login() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(loginWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  login,
];
