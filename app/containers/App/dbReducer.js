import { DB_VM_UPDATE_LIST } from './dbConstants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
});

function dbReducer(state = initialState, action) {
  switch (action.type) {
    case DB_VM_UPDATE_LIST: {
      let vm = {};
      action.items.forEach(function(item) {
        vm[item.uuid] = item;
      })

      return state
        .set('vm', vm);
    }
    default:
      return state;
  }
}

export default dbReducer;
