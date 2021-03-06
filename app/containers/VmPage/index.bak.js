/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import messages from './messages';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { genUniqueId } from 'utils/helpers'

import Button from 'components/Button';
import H1 from 'components/H1';

import styles from './styles.css';

import FontAwesome from 'react-fontawesome'

import {
  queryListStart,
  setNameAndHideModal,
  showModal,
  hideModal,
  updateCreateVmDialog,
  pageVmDestroy,
  pageVmUpdateList,
  queryListFailed,
  pageVmShowDetail,
  pageVmHideDetail,
  pageVmListHighlight,
  pageVmListNormal,
  pageVmSetPageSize,
  pageVmSetItemCount,
  pageVmSetPageNumber,
  pageVmShowCreateDialog,
  pageVmSetDetailSidePageUuid
} from './actions';

import {
  updateDbVmList
} from '../App/dbActions';

import { updateWindow } from '../App/windowActions'

import { selectDbVm, selectWindow } from '../App/selectors';

import {
  selectPageVmList,
  selectPageVmCreateVmDialogData,
  selectPageVmCurrItemUuid,
  selectPageVmPageSize,
  selectPageVmPageNumber,
  selectPageVmItemCount,
  selectPageVmShowCreateDialog,
  selectPageVmDetailSidePageUuid
} from './selectors'

import CreateVmDialog from 'components/dialogs/CreateVmDialog.js'

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers'

import appStyles from '../App/styles.css';

import VmInstanceDetailSidePage from 'containers/Windows/VmInstanceDetailSidePage'

import Pagination from 'containers/BaseClasses/Pagination'

// import { pageSizeList } from 'constants.js'

let VmListPage = React.createClass({
  mixins: [Pagination],
  componentWillMount: function() {
    this.globalState = this.props.route.store.getState();
    this.pageSizeList = [5, 10, 20, 50];
  },
  componentDidMount: function() {
    this.queryList();    
  },
  componentWillUnmount: function() {
    this.props.pageVmDestroy();
  },
  openRoute: function(route) {
    this.props.changeRoute(route);
  },
  queryList: function() {
    let self = this;
    apiCall({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        count: false,
        start: self.props.pageSize*(self.props.pageNumber - 1),
        limit: self.props.pageSize,
        replyWithCount: true,
        conditions: []
      }
    }).then(function(result) {
      var ret = firstItem(result);
      if (ret.success) {
        if (!! ret.inventories && ret.inventories.length > 0) {
          self.props.updateDbVmList(ret.inventories);
          let pageItemList = [];
          ret.inventories.forEach(function(item) {
            pageItemList.push({
              'uuid': item.uuid,
              'highlight': false
            });
          })
          self.props.pageVmUpdateList(pageItemList);
          self.props.pageVmSetItemCount(ret.total);
        }
      } else {
        self.props.queryListFailed(ret);
      }
    })
  },
  openCreateVmDialog: function() {
    this.props.pageVmShowCreateDialog(true);
    this.createVmDialogUuid = genUniqueId('window-createVm-');

    // NOTICE: To avoid uncontrolled component warning in React,
    // default value should be provided.
    // https://github.com/twisty/formsy-react-components/issues/66
    this.props.updateWindow(this.createVmDialogUuid, {
      uuid: this.createVmDialogUuid,
      name: ''
    });
  },
  closeCreateVmDialog: function() {
    this.props.pageVmShowCreateDialog(false);
  },
  onClickTabRow: function(item) {
    this.props.pageVmShowDetail(item.uuid);

    let uuidList = [];
    this.props.pageVmList.forEach(function(item) {
      if (item.highlight) {
        uuidList.push(item.uuid)
      }
    })
    if (uuidList.length > 0)
      this.props.pageVmListNormal(uuidList);

    this.props.pageVmListHighlight([item.uuid]);

    let newWindowUuid = genUniqueId('window-VmInstanceDetailSidePage-');
    this.props.pageVmSetDetailSidePageUuid(newWindowUuid);
    this.props.updateWindow(newWindowUuid, {
      uuid: item.uuid
    });
      
  },
  closeDetailSidePage: function() {
    this.props.pageVmSetDetailSidePageUuid(null);
  },
  createVm: function(data) {
    let self = this;
    apiCall({
      'org.zstack.header.vm.APICreateVmInstanceMsg': {
        name: data.name,
        instanceOfferingUuid: data.instanceOfferingUuid,
        imageUuid: data.imageUuid,
        l3NetworkUuids: data.l3NetworkUuids,
        defaultL3NetworkUuid: data.l3NetworkUuids[0]
      }
    }).then(function(result) {
      var ret = firstItem(result);
      if (ret.success) {
        self.queryList()
      } else {
        console.log(JSON.stringify(result))
        self.props.queryListFailed(ret);
      }
    })
  },
  render: function() {
    let {
      showModal,
      onConfirm,
      hideModal,
      name,
      pageVmShowDetail,
      pageVmHideDetail,
    } = this.props;
    
    let onClickTabRow = this.onClickTabRow;
    let onPageSizeChange = this.onPageSizeChange;
    let onPageUp = this.onPageUp;
    let onPageDown = this.onPageDown;

    let pageSize = this.props.pageSize;
    var list = [];
    let dbVm = this.props.dbVm;
    let pageVmList = this.props.pageVmList;
    if (!!dbVm && !!pageVmList) {
      pageVmList.forEach(function(item) {
        if (!!dbVm[item.uuid]) {
          list.push(Object.assign({}, dbVm[item.uuid], {'highlight': item.highlight}));
        }
      })
    }

    let currItem = null;
    if (!!this.props.currItemUuid) {
      currItem = dbVm[this.props.currItemUuid]
    }

    let pageNumber = this.props.pageNumber;
    let pageCount = 0;
    if (this.props.pageSize != 0)
      pageCount = Math.ceil(this.props.itemCount / this.props.pageSize);

    let showCreateVmDialog = this.props.showCreateVmDialog;
    let closeCreateVmDialog = this.closeCreateVmDialog;

    let createVmDialogData = this.props.globalWindow[this.createVmDialogUuid];

    return (
      <div>
        <Helmet
          title="VM Instance Page"
          meta={[
            { name: 'description', content: 'VM Instance page of Mevoco' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <Button onClick={this.openCreateVmDialog}>
          Create
        </Button>
        <div className={appStyles.tableContainer}>
          <div className={appStyles.pagination}>
            <select onChange={(event) => {onPageSizeChange(event)}} value={pageSize}>
              {
                this.pageSizeList.map(function(item) {
                  return <option key={item} value={item}>{item}</option>
                })
              }
            </select>
            {pageNumber}/{pageCount}
            <button className={`${appStyles.paginationButton} ${appStyles.left}`} onClick={onPageUp}><span className="fa fa-angle-left"/></button>
            <button className={`${appStyles.paginationButton} ${appStyles.right}`} onClick={onPageDown}><span className="fa fa-angle-right"/></button>
          </div>
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
                    onClick={() => onClickTabRow(item)}>
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
        { this.props.detailSidePageUuid && <VmInstanceDetailSidePage uuid={this.props.detailSidePageUuid} close={this.closeDetailSidePage}/>}
        <Button onClick={this.queryList}>
          Query
        </Button>
        { showCreateVmDialog && <CreateVmDialog cancel={closeCreateVmDialog}  ok={this.createVm} update={this.props.updateWindow} uuid={this.createVmDialogUuid}/> }
      </div>
    );
  }
})

// if (!!this.props.windows && !!this.props.windows[this.state.uuid]) {
//                 this.props.windows[this.state.uuid].map(function(item) {
//                   return item
//                 })
//               }
             



VmListPage.propTypes = {
  query: React.PropTypes.func,
  setWsConn: React.PropTypes.func,
};

// redux has to pass all functions through prop.
function mapDispatchToProps(dispatch) {
  return {
    queryList: (msg) => dispatch(queryListStart(msg)),
    changeRoute: (url) => dispatch(push(url)),
    showModal: (message) => dispatch(showModal(message)),
    onConfirm: (name) => dispatch(setNameAndHideModal(name)),
    hideModal: () => dispatch(hideModal()),
    updateCreateVmDialog: (name, value) => dispatch(updateCreateVmDialog(name, value)),
    pageVmDestroy: () => dispatch(pageVmDestroy()),
    pageVmUpdateList: (uuidList) => dispatch(pageVmUpdateList(uuidList)),
    queryListFailed: () => dispatch(queryListFailed()),
    updateDbVmList: (list) => dispatch(updateDbVmList(list)),
    pageVmShowDetail: (uuid) => dispatch(pageVmShowDetail(uuid)),
    pageVmHideDetail: () => dispatch(pageVmHideDetail()),
    pageVmListHighlight: (uuidList) => dispatch(pageVmListHighlight(uuidList)),
    pageVmListNormal: (uuidList) => dispatch(pageVmListNormal(uuidList)),
    setPageSize: (size) => dispatch(pageVmSetPageSize(size)),
    pageVmSetItemCount: (count) => dispatch(pageVmSetItemCount(count)),
    pageVmSetPageNumber: (number) => dispatch(pageVmSetPageNumber(number)),
    pageVmShowCreateDialog: (show) => dispatch(pageVmShowCreateDialog(show)),
    updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item)),
    pageVmSetDetailSidePageUuid: (uuid) => dispatch(pageVmSetDetailSidePageUuid(uuid)),
  };
}

// get state
const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  pageVmList: selectPageVmList(),
  createVmDialogData: selectPageVmCreateVmDialogData(),
  currItemUuid: selectPageVmCurrItemUuid(),
  pageSize: selectPageVmPageSize(),
  pageNumber: selectPageVmPageNumber(),
  itemCount: selectPageVmItemCount(),
  showCreateVmDialog: selectPageVmShowCreateDialog(),
  globalWindow: selectWindow(),
  detailSidePageUuid: selectPageVmDetailSidePageUuid()
});

export default connect(mapStateToProps, mapDispatchToProps)(VmListPage);
// export default connect(null, mapDispatchToProps)(VmListPage);
