 import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { updateDbVmList } from 'containers/App/dbActions';

import {
  createWindow,
  updateWindow,
  destroyWindow,
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

import { selectDbVm } from 'containers/App/selectors';

import appStyles from '../App/styles.css';

import WindowBase from './WindowBase.js';
import ListBase from './ListBase';
import VmInstanceList from './VmInstanceList.js';
import VmInstanceDetailSidePage  from './VmInstanceDetailSidePage.js'
import CreateVmDialog from 'containers/Dialogs/CreateVmDialog.js'
import Button from 'components/Button';
import messages from 'translations/messages.js';

let VmInstanceListFull = React.createClass({
  mixins: [WindowBase, ListBase, VmInstanceList],
  render: function() {
    let windowData = this.getWindowData();
    if (!windowData || !windowData.list || !this.props.dbVm) return null;
    let list = this.mergeWindowListAndDbList(windowData.list, this.props.dbVm);
    let { onClickRow, onSelectMultipleItem } = this;
    let test = messages
    return (
      <div className={appStyles.page}>
        Vm Instance
        
        <div className={appStyles.tableContainer}>
          <button className={appStyles.defaultButton} onClick={this.openCreateVmDialog}>Create</button>
          <div className={appStyles.pagination}>
            <select onChange={(event) => {this.onPageSizeChange(event)}} value={windowData.pageSize}>
              {
                this.pageSizeList.map(function(item) {
                  return <option key={item} value={item}>{item}</option>
                })
              }
            </select>
            {windowData.pageNumber}/{Math.ceil(windowData.count / windowData.pageSize)}
            <button className={`${appStyles.paginationButton} ${appStyles.left}`} onClick={this.onPageUp}><span className="fa fa-angle-left"/></button>
            <button className={`${appStyles.paginationButton} ${appStyles.right}`} onClick={this.onPageDown}><span className="fa fa-angle-right"/></button>
          </div>
          <table className={`${appStyles.normalFont} ${appStyles.table}`}>
            <thead className={appStyles.tableHeader}>
              <tr>
                <th className={appStyles.tableHeaderItem}><input type="checkbox" onClick={this.setSelectAll} checked={windowData.selectAll}/></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.name} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.cpuNum} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.memorySize} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.defaultIp} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.managementIp} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.hypervisorType} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.clusterUuid} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.state} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.ownerName} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.haLevel} /></th>
                <th className={appStyles.tableHeaderItem}><FormattedMessage {...messages.createDate} /></th>
              </tr>
            </thead>
            <tbody>
              {list.map(function(item){
                let rowStyle = null;
                if (!!item.selected)
                  rowStyle = appStyles.tableRow + ' ' + appStyles.tableRowHighlight;
                else
                  rowStyle = appStyles.tableRow + ' ' + appStyles.tableRowNormal;
                return <tr
                    key={item.uuid}
                    className={ rowStyle }
                    onClick={(event) => onClickRow(event, item)}>
                  <td><input type="checkbox" checked={item.selected} onClick={() => onSelectMultipleItem(item)} /></td>
                  <td>{item.name}</td>
                  <td>{item.cpuNum}</td>
                  <td>{item.memorySize}</td>
                  <td>{item.defaultIp}</td>
                  <td>{item.managementIp}</td>
                  <td>{item.hypervisorType}</td>
                  <td>{item.clusterUuid}</td>
                  <td>{item.state}</td>
                  <td>{item.ownerName}</td>
                  <td>{item.haLevel}</td>
                  <td>{item.createDate}</td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
        { windowData.detailSidePageWindowUuid && <VmInstanceDetailSidePage windowUuid={windowData.detailSidePageWindowUuid} close={this.closeDetailSidePage}/>}
        { windowData.createVmDialogWindowUuid && <CreateVmDialog cancel={this.closeCreateVmDialog}  ok={this.createVm} windowUuid={windowData.createVmDialogWindowUuid}/> }
      </div>
    );
  }
})

function mapDispatchToProps(dispatch) {
  return {
    createWindow: (parentUuid, parentValue, uuid, initValue) => dispatch(createWindow(parentUuid, parentValue, uuid, initValue)),
    updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item)),
    destroyWindow: (uuid) => dispatch(destroyWindow(uuid)),
    updateDbVmList: (list) => dispatch(updateDbVmList(list)),
  };
}

const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  globalWindow: selectWindow(),
});

export default connect(mapStateToProps, mapDispatchToProps)(VmInstanceListFull);