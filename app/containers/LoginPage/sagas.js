/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* remoteApiCallStart() {
  // Select username from store
  // const username = yield select(selectUsername());
  // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  // Call our request helper (see 'utils/request')
  const repos = yield call(request, requestURL);

  if (!repos.err) {
    yield put(reposLoaded(repos.data, username));
  } else {
    yield put(repoLoadingError(repos.err));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* apiCallWatcher() {
  while (yield take(REMOTE_API_CALL_START)) {
    yield call(remoteApiCallStart);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* remoteApiCall() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(remoteApiCallWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  remoteApiCall,
];
