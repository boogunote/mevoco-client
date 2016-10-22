import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

let VmInstanceListFull = React.createClass({
  mixins: [WindowBase, ListBase, VmInstanceList],
  render: function() {
    let windowData = this.getWindowData();
    if (!windowData || !windowData.list || !this.props.dbVm) return null;
    let list = this.mergeWindowListAndDbList(windowData.list, this.props.dbVm);
    let { onClickRow } = this;
    return (
      <div>
        Vm Instance
        <div className={appStyles.tableContainer}>
          <table className={`${appStyles.normalFont} ${appStyles.table}`}>
            <thead>
              <tr>
                <th>1
                </th>
                <th>2
                </th>
                <th>3
                </th>
                <th>4
                </th>
                <th>5
                </th>
                <th>6
                </th>
                <th>7
                </th>
                <th>8
                </th>
                <th>9
                </th>
                <th>10
                </th>
                <th>11
                </th>
              </tr>
            </thead>
            <tbody>
              {list.map(function(item){
                let rowStyle = null;
                if (!!item.highlight)
                  rowStyle = appStyles.tableRow + ' ' + appStyles.tableRowHighlight;
                else
                  rowStyle = appStyles.tableRow + ' ' + appStyles.tableRowNormal;
                return <tr
                    key={item.uuid}
                    className={ rowStyle }
                    onClick={() => onClickRow(item)}>
                  <td>{item.name}</td>
                  <td>{item.cpuNum}</td>
                  <td>{item.memorySize}</td>
                  <td>{item.managementIp}</td>
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
        { windowData.detailSidePageWindowUuid && <VmInstanceDetailSidePage uuid={windowData.detailSidePageWindowUuid} close={this.closeDetailSidePage}/>}
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