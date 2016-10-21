import {
  WINDOW_UPDATE,
  WINDOW_DESTROY,
  WINDOW_CREATE
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

export function createWindow(parentUuid, parentValue, uuid, initValue) {
  return {
    type: WINDOW_CREATE,
    parentUuid,
    parentValue,
    uuid,
    initValue
  };
}