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
  pageVmHideDetail
} from './actions';

import {
  updateDbVmList
} from '../App/dbActions';

import { selectDbVm } from '../App/selectors';

import {
  selectPageVmList,
  selectPageVmCreateVmDialogData,
  selectPageVmCurrItemUuid
} from './selectors'

import ConfirmModal from 'components/dialogs/ConfirmModal'

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers'

import appStyles from '../App/styles.css';

export class VmListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  };

  componentWillMount() {
    this.globalState = this.props.route.store.getState();
  }

  componentDidMount() {
    this.queryList();    
  }

  componentWillUnmount() {
    this.props.pageVmDestroy();
  }


  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  queryList = () => {
    let self = this;
    apiCall({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        count: false,
        start: 0,
        replyWithCount: true,
        conditions: []
      }
    }).then(function(result) {
      var ret = firstItem(result);
      if (ret.success) {
        if (!! ret.inventories && ret.inventories.length > 0) {
          self.props.updateDbVmList(ret.inventories);
          let uuidList = [];
          ret.inventories.forEach(function(item) {
            uuidList.push(item.uuid);
          })
          self.props.pageVmUpdateList(uuidList);
        }
      } else {
        self.props.queryListFailed(ret);
      }
    })
  }

  openCreateVmDialog = () => {
    this.props.showModal("What your name?");
  }

  render() {
    let { showModal, onConfirm, hideModal, name, pageVmShowDetail, pageVmHideDetail } = this.props
    var list = [];
    let dbVm = this.props.dbVm;
    let pageVmList = this.props.pageVmList;
    if (!!dbVm && !!pageVmList) {
      pageVmList.forEach(function(item) {
        list.push(dbVm[item]);
      })
    }
    let currItem = null;
    if (!!this.props.currItemUuid) {
      currItem = dbVm[this.props.currItemUuid]
    }
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
                return <tr key={item.uuid} className={appStyles.tableRow} onClick={() => pageVmShowDetail(item.uuid)}>
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
        { currItem &&
        <div className={appStyles.detailPage}>
          <div className={appStyles.detailPageHeader}>
            <Button onClick={pageVmHideDetail}><span className='fa fa-close' /></Button>
            {currItem.name}
          </div>
        </div>
        }
        <Button onClick={this.queryList}>
          Query
        </Button>
        <Button onClick={this.openCreateVmDialog}>
          Create
        </Button>
        <ConfirmModal message="'What your name?'" onConfirm={onConfirm} onCancel={hideModal} onUpdate={this.props.updateCreateVmDialog} data={this.props.createVmDialogData}></ConfirmModal>
      </div>
    );
  }
}

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
    pageVmHideDetail: () => dispatch(pageVmHideDetail())
  };
}

// get state
const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  pageVmList: selectPageVmList(),
  createVmDialogData: selectPageVmCreateVmDialogData(),
  currItemUuid: selectPageVmCurrItemUuid(),
});

export default connect(mapStateToProps, mapDispatchToProps)(VmListPage);
// export default connect(null, mapDispatchToProps)(VmListPage);
