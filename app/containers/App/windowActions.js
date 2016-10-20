import {
  WINDOW_UPDATE,
  WINDOW_DESTROY
} from './windowConstants'

export function updateWindow(uuid, item) {
  return {
    type: WINDOW_UPDATE,
    uuid,
    item
  };
}

export function destroyWindow(uuid) {
  return {
    type: WINDOW_DESTROY,
    uuid
  };
}