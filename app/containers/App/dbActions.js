import {
  DB_VM_UPDATE_LIST,
} from './dbConstants'

export function updateDbVmList(items) {
  return {
    type: DB_VM_UPDATE_LIST,
    items
  };
}