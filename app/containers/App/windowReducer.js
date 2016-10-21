import {
  WINDOW_UPDATE,
  WINDOW_DESTROY,
  WINDOW_CREATE
} from './windowConstants';
import { fromJS } from 'immutable';

// The initial state of the App
// const initialState = fromJS({
// });

function windowReducer(state = {}, action) {
  switch (action.type) {
    case WINDOW_UPDATE: {
      let newWindow = Object.assign({}, state[action.uuid], action.item);
      let newState = Object.assign({}, state);
      newState[action.uuid] = newWindow;
      
      return newState;
    }
    case WINDOW_DESTROY: {
      let newState = Object.assign({}, state);
      delete newState[action.uuid]
      return newState;
    }
    case WINDOW_CREATE: {
      let newParentWindow = Object.assign({}, state[action.parentUuid], action.parentValue);
      let newWindow = Object.assign({}, state[action.uuid], action.initValue);
      let newState = Object.assign({}, state);
      newState[action.parentUuid] = newParentWindow;
      newState[action.uuid] = newWindow;
      
      return newState;
    }
    default:
      return state;
  }
}

export default windowReducer;
