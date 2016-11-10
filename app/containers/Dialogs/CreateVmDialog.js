import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import SelectInstanceOfferingDialog from './SelectInstanceOfferingDialog'
import SelectImageDialog from './SelectImageDialog'
import SelectL3NetworkDialog from './SelectL3NetworkDialog'

import {
  createWindow,
  updateWindow,
  destroyWindow
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

import { genUniqueId } from 'utils/helpers';

import {
  selectDbInstanceOffering,
  selectDbImage,
  selectDbL3Network
} from 'containers/App/selectors';

class CreateVmDialog extends Component {

  onOk = () => {
    this.props.destroyWindow(this.props.windowUuid);

    let windowData = this.props.globalWindow[this.props.windowUuid];
    this.props.ok(Object.assign({}, windowData));
  }

  onCancel = () => {
    this.props.destroyWindow(this.props.windowUuid);
    this.props.cancel();
  }

  onChangeName = (event) => {
    this.props.updateWindow(this.props.windowUuid, {
      name: event.target.value
    });
  }

  onOpenInstanceOfferingDialog = () => {
    let newDialogUuid = genUniqueId('window-instanceOffering-');
    this.props.createWindow(this.props.windowUuid, {instanceOfferingDialogUuid: newDialogUuid},
      newDialogUuid, {
      uuid: newDialogUuid,
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
    });
  }

  selectInstanceOfferingOk = (uuid) => {
    this.props.updateWindow(this.props.windowUuid, {instanceOfferingDialogUuid: undefined});
    this.props.updateWindow(this.props.windowUuid, {instanceOfferingUuid: uuid});
  }

  selectInstanceOfferingCancel = () => {
    this.props.updateWindow(this.props.windowUuid, {instanceOfferingDialogUuid: undefined});
  }

  onOpenImageDialog = () => {
    let newDialogUuid = genUniqueId('window-image');
    this.props.createWindow(this.props.windowUuid, {imageDialogUuid: newDialogUuid},
      newDialogUuid, {
      uuid: newDialogUuid,
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
    });
  }

  selectImageOk = (uuid) => {
    this.props.updateWindow(this.props.windowUuid, {imageDialogUuid: false});
    this.props.updateWindow(this.props.windowUuid, {imageUuid: uuid});
  }

  selectImageCancel = () => {
    this.props.updateWindow(this.props.windowUuid, {imageDialogUuid: false});
  }

  onOpenL3NetworkDialog = () => {
    let newDialogUuid = genUniqueId('window-l3Network');
    this.props.createWindow(this.props.windowUuid, {l3NetworkDialogUuid: newDialogUuid},
      newDialogUuid, {
      uuid: newDialogUuid,
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
    });
  }

  selectL3NetworkOk = (uuid) => {
    this.props.updateWindow(this.props.windowUuid, {l3NetworkDialogUuid: false});
    this.props.updateWindow(this.props.windowUuid, {l3NetworkUuids: [uuid]});
  }

  selectL3NetworkCancel = () => {
    this.props.updateWindow(this.props.windowUuid, {l3NetworkDialogUuid: false});
  }

  render() {
    let windowData = this.props.globalWindow[this.props.windowUuid];
    if (!windowData) return null;


    return (
      <div className={styles.confirmModal}>
        <div>
          <div>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.confirmModalContent}>
              <span className={styles.confirmModalMessage}>Create VM</span>
              <input className={styles.confirmModalInput} type="text" value={windowData.name} onChange={this.onChangeName}/>
              <div>
                { windowData.instanceOfferingUuid && this.props.dbInstanceOffering[windowData.instanceOfferingUuid].name}
                <button className={styles.btn} onClick={this.onOpenInstanceOfferingDialog}>InstanceOffering</button>
              </div>
              <div>
                { windowData.imageUuid && this.props.dbImage[windowData.imageUuid].name}
                <button className={styles.btn} onClick={this.onOpenImageDialog}>Image</button>
              </div>
              <div>
                { !!windowData.l3NetworkUuids && this.props.dbL3Network[windowData.l3NetworkUuids[0]].name}
                <button className={styles.btn} onClick={this.onOpenL3NetworkDialog}>L3 Network</button>
              </div>
              <button className={styles.btn} onClick={this.onOk}>OK</button>
              <button className={styles.btn} onClick={(event) => this.onCancel(event)}>Cancel</button>
              { !!windowData.instanceOfferingDialogUuid && <SelectInstanceOfferingDialog ok={this.selectInstanceOfferingOk} cancel={this.selectInstanceOfferingCancel} windowUuid={windowData.instanceOfferingDialogUuid}/> }
              { !!windowData.imageDialogUuid && <SelectImageDialog ok={this.selectImageOk} cancel={this.selectImageCancel} windowUuid={windowData.imageDialogUuid}/> }
              { !!windowData.l3NetworkDialogUuid && <SelectL3NetworkDialog ok={this.selectL3NetworkOk} cancel={this.selectL3NetworkCancel} windowUuid={windowData.l3NetworkDialogUuid}/> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createWindow: (parentUuid, parentValue, uuid, initValue) => dispatch(createWindow(parentUuid, parentValue, uuid, initValue)),
    updateWindow: (uuid, item) => dispatch(updateWindow(uuid, item)),
    destroyWindow: (uuid) => dispatch(destroyWindow(uuid)),
  };
}

const mapStateToProps = createStructuredSelector({
  dbInstanceOffering: selectDbInstanceOffering(),
  dbImage: selectDbImage(),
  dbL3Network: selectDbL3Network(),
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateVmDialog);