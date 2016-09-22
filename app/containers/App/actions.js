/*
 * App Actions
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
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOGIN_BY_ACCOUNT,
  SET_WEBSOCKET_CONNECTION,
  REMOTE_API_CALL_START,
  REMOTE_API_CALL_SUCCESS,
  REMOTE_API_CALL_FAILED,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function loginByAccount(session) {
  return {
    type: LOGIN_BY_ACCOUNT,
    session,
  };
}

export function setWsConn(wsconn) {
  return {
    type: SET_WEBSOCKET_CONNECTION,
    wsconn,
  };
}

export function remoteApiCallStart(call) {
  return {
    type: REMOTE_API_CALL_START,
    call
  };
}

export function remoteApiCallSuccess(result) {
  return {
    type: REMOTE_API_CALL_SUCCESS,
    result
  };
}

export function remoteApiCallFailed(result) {
  return {
    type: REMOTE_API_CALL_FAILED,
    result
  };
}