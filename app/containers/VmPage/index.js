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

import {
  queryListStart,
  setNameAndHideModal,
  showModal,
  hideModal
} from './actions';

import { selectDbVm } from '../App/selectors';

import { selectPageVmList, selectPageVmCreateVmDialogData } from './selectors'

import ConfirmModal from 'components/dialogs/ConfirmModal'

export class VmListPage extends React.Component {

  constructor(props, context) {
    super(props, context);
  };

  componentDidMount() {
    this.queryList();
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
    this.props.queryList({
      'org.zstack.header.vm.APIQueryVmInstanceMsg': {
        count: false,
        start: 0,
        replyWithCount: true,
        conditions: []
      }
    });
  }

  openCreateVmDialog = () => {
    this.props.showModal("What your name?");
  }

  render() {
    let { showModal, onConfirm, hideModal, name } = this.props
    var list = [];
    if (!!this.props.dbVm && !!this.props.pageVmList) {
      let vmList = this.props.dbVm;
      this.props.pageVmList.forEach(function(item) {
        list.push(vmList[item]);
      })
    }
    return (
      <div>
        <Helmet
          title="VM Instance"
          meta={[
            { name: 'description', content: 'VM Instance page of ZStack' },
          ]}
        />
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <table>
          <tbody>
            {list.map(function(item){
              return <tr key={item.uuid}><td>{item.name}</td></tr>
            })}
          </tbody>
        </table>
        <Button onClick={this.queryList}>
          Query
        </Button>
        <Button onClick={this.openCreateVmDialog}>
          Create
        </Button>
        <ConfirmModal message="'What your name?'" onConfirm={onConfirm} onCancel={hideModal} data={this.props.createVmDialogData}></ConfirmModal>
        { name &&
          <div className="name">
            {"Hello " + name}
          </div>
        }
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
    hideModal: () => dispatch(hideModal())
  };
}

// get state
const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  pageVmList: selectPageVmList(),
  createVmDialogData: selectPageVmCreateVmDialogData()
});

export default connect(mapStateToProps, mapDispatchToProps)(VmListPage);
