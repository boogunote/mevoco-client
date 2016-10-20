import {
  DB_VM_UPDATE_LIST,
  DB_INSTANCE_OFFERING_UPDATE_LIST,
  DB_IMAGE_UPDATE_LIST,
  DB_L3NETWORK_UPDATE_LIST
} from './dbConstants'

export function updateDbVmList(items) {
  return {
    type: DB_VM_UPDATE_LIST,
    items
  };
}

export function updateDbInstanceOfferingList(items) {
  return {
    type: DB_INSTANCE_OFFERING_UPDATE_LIST,
    items
  };
}

export function updateDbImageList(items) {
  return {
    type: DB_IMAGE_UPDATE_LIST,
    items
  };
}

export function updateDbL3NetworkList(items) {
  return {
    type: DB_L3NETWORK_UPDATE_LIST,
    items
  };
}