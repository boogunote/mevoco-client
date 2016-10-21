import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import {
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

import { FormattedMessage } from 'react-intl';

// <FormattedMessage {...messages.header} />
let VmInstanceDetailSidePage = React.createClass({
  mixins: [VmInstanceDetail],
  render: function() {
    let windowData = this.props.globalWindow[this.props.uuid];
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
    </div>)
  }
});

function mapDispatchToProps(dispatch) {
  return {
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