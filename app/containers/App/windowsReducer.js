import { VM_LIST_WINDOW_UPDATE } from './windowsConstants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
});

function windowsReducer(state = initialState, action) {
  switch (action.type) {
    // case VM_LIST_WINDOW_UPDATE: {
    //   return state
    //     .set(action.payload.windowUuid, action.payload.uuidList);
    // }
    default:
      return state;
  }
}

export default windowsReducer;
