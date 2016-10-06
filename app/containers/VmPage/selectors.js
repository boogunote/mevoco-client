import { createSelector } from 'reselect';
import { selectPageVm } from '../App/selectors';


export const selectPageVmList = () => createSelector(
  selectPageVm(),
  // (pageVm) => pageVm.get('list')
  (pageVm) => {
  	return pageVm.list
  }
);