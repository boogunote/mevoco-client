import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import {
  updateWindow,
  destroyWindow
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

import { apiCall } from 'utils/remoteCall';
import { firstItem, genUniqueId } from 'utils/helpers';

import {
  updateDbImageList
} from 'containers/App/dbActions';

import { selectDbImage } from 'containers/App/selectors';

import appStyles from 'containers/App/styles.css';

let VmInstanceDetail = {
  componentDidMount: function() {
    this.props.updateWindow(this.props.windowUuid, {
      currTab: 'info'
    })
  },
  switchTab: function(tabName) {
    this.props.updateWindow(this.props.windowUuid, {
      currTab: tabName
    })
  },
  close: function() {
    this.props.destroyWindow(this.props.windowUuid);
    this.props.close();
  }
}

export default VmInstanceDetail;

// function mapDispatchToProps(dispatch) {
//   return {
//     updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item)),
//     destroyWindow: (uuid) => dispatch(destroyWindow(uuid)),
//     updateDbImageList: (list) => dispatch(updateDbImageList(list))
//   };
// }

// const mapStateToProps = createStructuredSelector({
//   dbImage: selectDbImage(),
//   globalWindow: selectWindow()
// });


// export default connect(mapStateToProps, mapDispatchToProps)(VmInstanceDetail);