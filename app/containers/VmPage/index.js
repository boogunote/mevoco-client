import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { genUniqueId } from 'utils/helpers';

import Helmet from 'react-helmet';

import { setListWindowUuid } from './actions';
import { selectListWindowUuid } from './selectors'

import { updateWindow } from 'containers/App/windowActions'

import { selectWindow } from 'containers/App/selectors';

import VmInstanceListFull from 'containers/Windows/VmInstanceListFull'
import ListBase from 'containers/Windows/ListBase';

let VmListPage = React.createClass({
  componentWillMount: function() {
    let newWindowUuid = genUniqueId('window-VmInstanceWindowFull-');
    this.props.setListWindowUuid(newWindowUuid);
    this.props.updateWindow(newWindowUuid,
      Object.assign(
        {},
        {uuid: newWindowUuid},
        ListBase.getInitData()
      )
    );
  },
  render: function() {
    return (
      <div>
        <Helmet
          title="VM Instance Page"
          meta={[
            { name: 'description', content: 'VM Instance page of Mevoco' },
          ]}
        />
        <VmInstanceListFull windowUuid={this.props.listWindowUuid} />
      </div>
    );
  }
})

function mapDispatchToProps(dispatch) {
  return {
    setListWindowUuid: (uuid) => dispatch(setListWindowUuid(uuid)),
    updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item))
  };
}

const mapStateToProps = createStructuredSelector({
  globalWindow: selectWindow(),
  listWindowUuid: selectListWindowUuid()
});

export default connect(mapStateToProps, mapDispatchToProps)(VmListPage);

