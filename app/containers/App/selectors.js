/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const selectWsConn = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('wsconn')
);

const selectSession = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('session')
);

const selectApiCalls = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('apiCalls')
);

const selectDb = () => (state) => state.get('db');

const selectDbVm = () => createSelector(
  selectDb(),
  (db) => db.get('vm')
);

const selectDbInstanceOffering = () => createSelector(
  selectDb(),
  (db) => db.get('instanceOffering')
);

const selectDbImage = () => createSelector(
  selectDb(),
  (db) => db.get('image')
);

const selectDbL3Network = () => createSelector(
  selectDb(),
  (db) => db.get('l3Network')
);

const selectPageVm = () => (state) => state.get('vm');

const selectWindow = () => (state) => state.get('window');

// const selectWindows = () => (state) => state.get('windows');

export {
  selectGlobal,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,
  selectWsConn,
  selectSession,
  selectApiCalls,
  selectDb,
  selectDbVm,
  selectDbInstanceOffering,
  selectDbImage,
  selectDbL3Network,
  selectPageVm,
  selectWindow,
};
