import {
  DB_VM_UPDATE_LIST,
  DB_INSTANCE_OFFERING_UPDATE_LIST,
  DB_IMAGE_UPDATE_LIST,
  DB_L3NETWORK_UPDATE_LIST
} from './dbConstants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
});

function dbReducer(state = initialState, action) {
  switch (action.type) {
    case DB_VM_UPDATE_LIST: {
      let newState = Object.assign({}, state.vm);
      action.items.forEach(function(item) {
        newState[item.uuid] = item;
      })

      return state
        .set('vm', newState);
    }
    case DB_INSTANCE_OFFERING_UPDATE_LIST: {
      let newState = Object.assign({}, state.instanceOffering);
      action.items.forEach(function(item) {
        newState[item.uuid] = item;
      })

      return state
        .set('instanceOffering', newState);
    }
    case DB_IMAGE_UPDATE_LIST: {
      let newState = Object.assign({}, state.image);
      action.items.forEach(function(item) {
        newState[item.uuid] = item;
      })

      return state
        .set('image', newState);
    }
    case DB_L3NETWORK_UPDATE_LIST: {
      let newState = Object.assign({}, state.l3Network);
      action.items.forEach(function(item) {
        newState[item.uuid] = item;
      })

      return state
        .set('l3Network', newState);
    }
    default:
      return state;
  }
}

export default dbReducer;
