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