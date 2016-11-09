import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import {
  updateWindow,
  destroyWindow
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';

import {
  updateDbInstanceOfferingList
} from 'containers/App/dbActions';

import { selectDbInstanceOffering } from 'containers/App/selectors';

import appStyles from 'containers/App/styles.css';

class SelectInstanceOfferingDialog extends Component {

  componentDidMount() {
    this.queryList();    
  }

  queryList = () => {
    let windowData = this.props.globalWindow[this.props.uuid];
    let self = this;
    apiCall({
      'org.zstack.header.configuration.APIQueryInstanceOfferingMsg': {
        count: false,
        start: windowData.pageSize*(windowData.pageNumber - 1),
        limit: windowData.pageSize,
        replyWithCount: true,
        conditions: []
      }
    }).then(function(result) {
      var ret = firstItem(result);
      if (ret.success) {
        if (!! ret.inventories && ret.inventories.length > 0) {
          self.props.updateDbInstanceOfferingList(ret.inventories);
          let pageItemList = [];
          ret.inventories.forEach(function(item) {
            pageItemList.push({
              'uuid': item.uuid,
              'highlight': false
            });
          })

          
          self.props.updateWindow(self.props.uuid, {
            list: pageItemList
          })
          // self.props.pageVmUpdateList(pageItemList);
          // self.props.pageVmSetItemCount(ret.total);
        }
      } else {
        // self.props.queryListFailed(ret);
      }
    })
  }

  onOk = () => {
    this.props.destroyWindow(this.props.uuid);

    let windowData = this.props.globalWindow[this.props.uuid];
    let uuidList = [];
    for(var i in windowData.list) {
      if (windowData.list[i].selected) {
        uuidList.push(windowData.list[i].uuid)
      }
    }
    this.props.ok(uuidList[0]);
  }

  onCancel = () => {
    this.props.destroyWindow(this.props.uuid);
    this.props.cancel();
  }

  onClickTabRow = (item) => {
    let windowData = this.props.globalWindow[this.props.uuid];

    let newList = Object.assign([], windowData.list);

    for(var i in newList) {
      if (newList[i].uuid == item.uuid) {
        newList[i].selected = true;
      } else {
        newList[i].selected = false;
      }
    }
    this.props.updateWindow(this.props.uuid, {
      list: newList
    })
  }

  render() {
    let data = this.props.globalWindow[this.props.uuid];
    if (!data) return null;

    let windowData = this.props.globalWindow[this.props.uuid];
    if (!windowData.list) return null;

    var list = [];
    let dbInstanceOffering = this.props.dbInstanceOffering;
    if (!!dbInstanceOffering && !!windowData.list) {
      for (var i in windowData.list) {
        if (!!dbInstanceOffering[windowData.list[i].uuid]) {
          list.push(Object.assign({}, dbInstanceOffering[windowData.list[i].uuid], {'selected': windowData.list[i].selected}));
        }
      }
    }

    let onClickTabRow = this.onClickTabRow;

    return (
      <div className={styles.confirmModal}>
        <div>
          <div>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.confirmModalContent}>
              <span className={styles.confirmModalMessage}>Test</span>
              <table className={`${appStyles.normalFont} ${appStyles.table}`}>
                <thead>
                  <tr>
                    <th>1
                    </th>
                    <th>2
                    </th>
                    <th>3
                    </th>
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
                        onClick={() => onClickTabRow(item)}>
                      <td>{item.name}</td>
                      <td>{item.cpuNum}</td>
                      <td>{item.createDate}</td>
                    </tr>
                  })}
                </tbody>
              </table>
              <button className={styles.btn} onClick={(event) => this.onOk(event)}>OK</button>
              <button className={styles.btn} onClick={(event) => this.onCancel(event)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item)),
    destroyWindow: (uuid) => dispatch(destroyWindow(uuid)),
    updateDbInstanceOfferingList: (list) => dispatch(updateDbInstanceOfferingList(list))
  };
}

const mapStateToProps = createStructuredSelector({
  dbInstanceOffering: selectDbInstanceOffering(),
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectInstanceOfferingDialog);