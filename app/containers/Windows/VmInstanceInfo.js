import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';

import { selectWindow } from 'containers/App/selectors';
import { selectDbVm } from 'containers/App/selectors';

import appStyles from 'containers/App/styles.css';

import { FormattedMessage } from 'react-intl';

// <FormattedMessage {...messages.header} />
let VmInstanceInfo = React.createClass({
  render: function() {
    let data = this.props.dbVm[this.props.dataUuid];
    if (!data) return null;
    return (
      <div>
        {data.name}
      </div>
    )
  }
});

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(VmInstanceInfo);