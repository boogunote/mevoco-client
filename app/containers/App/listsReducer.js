import { VM_LIST_UPDATE } from './listsConstants';
import { VM_LIST_WINDOW_UPDATE } from './windowsConstants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
});

function listsReducer(state = initialState, action) {
  switch (action.type) {
    case VM_LIST_UPDATE: {
      let vm = {};
      action.items.forEach(function(item) {
        vm[item.uuid] = item;
      })

      return state
        .set('vm', vm);
    }
    case VM_LIST_WINDOW_UPDATE: {
      let windows = windows = {};
      windows[action.payload.windowUuid] = action.payload.uuidList;
      return state
        .set('windows', windows);
    }
    default:
      return state;
  }
}

export default listsReducer;
