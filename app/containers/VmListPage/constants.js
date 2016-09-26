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

export const VM_LIST_QUERY_START = 'zstack/VM_LIST/QUERY_START';
export const VM_LIST_QUERY_SUCCESS = 'zstack/VM_LIST/QUERY_SUCCESS';
export const VM_LIST_QUERY_FAILED = 'zstack/VM_LIST/QUERY_FAILED';