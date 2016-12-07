import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import {
  createWindow,
  updateWindow,
  destroyWindow
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';

import {
  updateDbImageList
} from 'containers/App/dbActions';

import { selectDbVm } from 'containers/App/selectors';

import appStyles from 'containers/App/styles.css';

import VmInstanceDetail from './VmInstanceDetail'
import VmInstanceInfo from './VmInstanceInfo'
import VmInstanceSnapshot from './VmInstanceSnapshot'
import VmInstanceMonitor from './VmInstanceMonitor'

import { FormattedMessage } from 'react-intl';

// <FormattedMessage {...messages.header} />
let VmInstanceDetailSidePage = React.createClass({
  mixins: [VmInstanceDetail],
  render: function() {
    let windowData = this.props.globalWindow[this.props.windowUuid];
    if (!windowData) return null;
    let vmData = this.props.dbVm[windowData.uuid];
    return (
    <div className={appStyles.detailPage}>
      <div className={appStyles.detailPageHeader}>
        <div>
          Vm Instance
          <span onClick={this.close} className={`${appStyles.detailPageClose} fa fa-close`} />
        </div>
        {vmData.name}
      </div>
      <a className={appStyles.detailPageTabHeader} onClick={() => this.switchTab('info')}>Info</a>
      <a className={appStyles.detailPageTabHeader} onClick={() => this.switchTab('snapshot')}>Snapshot</a>
      <a className={appStyles.detailPageTabHeader} onClick={() => this.switchTab('monitor')}>Monitor</a>
      { 'info' == windowData.currTab && <VmInstanceInfo dataUuid={windowData.uuid} />}
      { 'snapshot' == windowData.currTab && <VmInstanceSnapshot dataUuid={windowData.uuid} />}
      { 'monitor' == windowData.currTab && <VmInstanceMonitor dataUuid={windowData.uuid} />}
    </div>)
  }
});

function mapDispatchToProps(dispatch) {
  return {
    createWindow: (parentUuid, parentValue, uuid, initValue) => dispatch(createWindow(parentUuid, parentValue, uuid, initValue)),
    updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item)),
    destroyWindow: (uuid) => dispatch(destroyWindow(uuid)),
    updateDbImageList: (list) => dispatch(updateDbImageList(list))
  };
}

const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(VmInstanceDetailSidePage);