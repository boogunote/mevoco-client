import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { firstItem } from 'utils/helpers'

import { PAGE_VM_QUERY_LIST_START } from './constants';
import {
  updateDbVmList,
  pageVmUpdateList,
  queryListFailed } from './actions';
import { apiCall } from 'utils/remoteCall';

/**
 * Github repos request/response handler
 */
export function* doVmListQuery(payload) {

  // Call our request helper (see 'utils/request')
  const data = yield call(apiCall, payload.msg);
  var ret = firstItem(data);
  if (ret.success) {
    if (!! ret.inventories && ret.inventories.length > 0) {
      yield put(updateDbVmList(ret.inventories));
      let uuidList = [];
      ret.inventories.forEach(function(item) {
        uuidList.push(item.uuid);
      })
      yield put(pageVmUpdateList(uuidList));
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
    const action = yield take(PAGE_VM_QUERY_LIST_START)
    yield call(doVmListQuery, action.payload);
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