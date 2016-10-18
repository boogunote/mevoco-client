import { createSelector } from 'reselect';
import { selectPageVm } from '../App/selectors';


export const selectPageVmList = () => createSelector(
  selectPageVm(),

  (pageVm) => {
  	return pageVm.list
  }
);

export const selectPageVmCreateVmDialogData = () => createSelector(
  selectPageVm(),
  (pageVm) => {
  	return pageVm.modals
  }
);

export const selectPageVmCurrItemUuid = () => createSelector(
  selectPageVm(),
  (pageVm) => {
    return pageVm.currItemUuid
  }
);