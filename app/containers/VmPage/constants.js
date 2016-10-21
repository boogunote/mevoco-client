/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const PAGE_VM_QUERY_LIST_START = 'zs/page/vm/query/list/start';
export const PAGE_VM_QUERY_LIST_SUCCESS = 'zs/page/vm/query/list/success';
export const PAGE_VM_QUERY_FAILED = 'zs/page/vm/query/list/failed';
export const PAGE_VM_UPDATE_LIST = 'zs/page/vm/update/list';
export const PAGE_VM_DIALOG_CREATE_VM_UPDATE = 'zs/page/vm/dialog/createVm/update';
export const PAGE_VM_DESTROY = 'zs/page/vm/destroy';
export const PAGE_VM_SHOW_DETAIL = 'zs/page/vm/show/detail';
export const PAGE_VM_HIDE_DETAIL = 'zs/page/vm/hide/detail';
export const PAGE_VM_LIST_HIGHLIGHT = 'zs/page/vm/list/highlight';
export const PAGE_VM_LIST_NORMAL = 'zs/page/vm/list/normal';
export const PAGE_VM_LIST_SET_PAGE_SIZE = 'zs/page/vm/setPageSize';
export const PAGE_VM_LIST_SET_PAGE_NUMBER = 'zs/page/vm/setPageNumber';
export const PAGE_VM_LIST_SET_ITEM_COUNT = 'zs/page/vm/setItemCount';
export const PAGE_VM_SHOW_CREATE_VM_DIALOG = 'zs/page/vm/showCreateVmDialog';
export const PAGE_VM_SET_DETAIL_SIDE_PAGE_UUID = 'zs/page/vm/setDetailSidePageUuid';