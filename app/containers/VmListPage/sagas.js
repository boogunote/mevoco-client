import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { API_CALL_START } from '../App/constants';
import { apiCallSuccess, apiCallFailed } from '../App/actions';
import { apiCall } from 'utils/remoteCall';

/**
 * Github repos request/response handler
 */
export function* getRemoteApiCall(msg) {

  // Call our request helper (see 'utils/request')
  const ret = yield call(apiCall, msg);

  if (ret.success) {
    yield put(apiCallSuccess(ret));
  } else {
    yield put(apiCallFailed(ret));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* remoteApiCallWatcher() {
  while (true) {
    const action = yield take(API_CALL_START)
    yield call(getRemoteApiCall, action.msg);
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