import {
  WINDOW_UPDATE,
  WINDOW_DESTROY
} from './windowConstants';
import { fromJS } from 'immutable';

// The initial state of the App
// const initialState = fromJS({
// });

function windowReducer(state = {}, action) {
  switch (action.type) {
    case WINDOW_UPDATE: {
      // NOTICE: To avoid uncontrolled component warning in React,
      // default value should be provided.
      // https://github.com/twisty/formsy-react-components/issues/66
      let initWindow = {
        uuid: '',
        'name': ''
      }

      let newWindow = Object.assign(initWindow, state[action.uuid], action.item);
      let newState = Object.assign({}, state);
      newState[action.uuid] = newWindow;
      
      return newState;
    }
    case WINDOW_DESTROY: {
      let newState = Object.assign({}, state);
      delete newState[action.uuid]
      return newState;
    }
    default:
      return state;
  }
}

export default windowReducer;
