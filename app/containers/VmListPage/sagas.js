import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { firstItem } from 'utils/helpers'

import { VM_LIST_QUERY_START } from './constants';
import {
  updateVmList,
  updateWindowList,
  queryListFailed } from './actions';
import { apiCall } from 'utils/remoteCall';

/**
 * Github repos request/response handler
 */
export function* getVmListQuery(payload) {

  // Call our request helper (see 'utils/request')
  const data = yield call(apiCall, payload.msg);
  var ret = firstItem(data);
  if (ret.success) {
    if (!! ret.inventories && ret.inventories.length > 0) {
      yield put(updateVmList(ret.inventories));
      let uuidList = [];
      ret.inventories.forEach(function(item) {
        uuidList.push(item.uuid);
      })
      yield put(updateWindowList(uuidList, payload.windowUuid));
    }
  } else {
    yield put(queryListFailed(ret));
  }
}

/**
 * Watches for LOAD_REPOS action and calls handler
 */
export function* vmListQueryWatcher() {
  while (true) {
    const action = yield take(VM_LIST_QUERY_START)
    yield call(getVmListQuery, action.payload);
  }
}

/**
 * Root saga manages watcher lifecycle

 */
export function* vmListQuery() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(vmListQueryWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  vmListQuery,
];