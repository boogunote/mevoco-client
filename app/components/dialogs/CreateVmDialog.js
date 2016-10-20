import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';
import SelectInstanceOfferingDialog from './SelectInstanceOfferingDialog'
import SelectImageDialog from './SelectImageDialog'
import SelectL3NetworkDialog from './SelectL3NetworkDialog'

import {
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

  onClose = () => {
    this.props.destroyWindow(this.props.uuid);
    this.props.cancel();
  }

  onChangeName = (event) => {
    this.props.updateWindow(this.props.uuid, {
      name: event.target.value
    });
  }

  onOpenInstanceOfferingDialog = () => {
    this.props.updateWindow(this.props.uuid, {showSelectInstanceOfferingDialog: true});
    this.selectInstanceOfferingDialogUuid = genUniqueId('window-instanceOffering-');
    this.props.updateWindow(this.selectInstanceOfferingDialogUuid, {
      uuid: this.selectInstanceOfferingDialogUuid,
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
    });
  }

  selectInstanceOfferingOk = (uuid) => {
    this.props.updateWindow(this.props.uuid, {showSelectInstanceOfferingDialog: false});
    this.props.updateWindow(this.props.uuid, {instanceOfferingUuid: uuid});
  }

  selectInstanceOfferingCancel = () => {
    this.props.updateWindow(this.props.uuid, {showSelectInstanceOfferingDialog: false});
  }

  onOpenImageDialog = () => {
    this.props.updateWindow(this.props.uuid, {showSelectImageDialog: true});
    this.selectImageDialogUuid = genUniqueId('window-image');
    this.props.updateWindow(this.selectImageDialogUuid, {
      uuid: this.selectImageDialogUuid,
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
    });
  }

  selectImageOk = (uuid) => {
    this.props.updateWindow(this.props.uuid, {showSelectImageDialog: false});
    this.props.updateWindow(this.props.uuid, {imageUuid: uuid});
  }

  selectImageCancel = () => {
    this.props.updateWindow(this.props.uuid, {showSelectImageDialog: false});
  }

  onOpenL3NetworkDialog = () => {
    this.props.updateWindow(this.props.uuid, {showSelectL3NetworkDialog: true});
    this.selectL3NetworkDialogUuid = genUniqueId('window-l3Network');
    this.props.updateWindow(this.selectL3NetworkDialogUuid, {
      uuid: this.selectL3NetworkDialogUuid,
      pageSize: 20,
      pageNumber: 1,
      pageCount: 0,
    });
  }

  selectL3NetworkOk = (uuid) => {
    this.props.updateWindow(this.props.uuid, {showSelectL3NetworkDialog: false});
    this.props.updateWindow(this.props.uuid, {l3NetworkUuid: uuid});
  }

  selectL3NetworkCancel = () => {
    this.props.updateWindow(this.props.uuid, {showSelectL3NetworkDialog: false});
  }

  render() {
    let data = this.props.globalWindow[this.props.uuid];
    if (!data) return null;
    return (
      <div className={styles.confirmModal}>
        <div>
          <div>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.confirmModalContent}>
              <span className={styles.confirmModalMessage}>Create VM</span>
              <input className={styles.confirmModalInput} type="text" value={data.name} onChange={this.onChangeName}/>
              <div>
                { data.instanceOfferingUuid && this.props.dbInstanceOffering[data.instanceOfferingUuid].name}
                <button className={styles.btn} onClick={this.onOpenInstanceOfferingDialog}>InstanceOffering</button>
              </div>
              <div>
                { data.imageUuid && this.props.dbImage[data.imageUuid].name}
                <button className={styles.btn} onClick={this.onOpenImageDialog}>Image</button>
              </div>
              <div>
                { data.l3NetworkUuid && this.props.dbL3Network[data.l3NetworkUuid].name}
                <button className={styles.btn} onClick={this.onOpenL3NetworkDialog}>L3 Network</button>
              </div>
              <button className={styles.btn}>OK</button>
              <button className={styles.btn} onClick={(event) => this.onClose(event)}>Cancel</button>
              { data.showSelectInstanceOfferingDialog && <SelectInstanceOfferingDialog ok={this.selectInstanceOfferingOk} cancel={this.selectInstanceOfferingCancel} uuid={this.selectInstanceOfferingDialogUuid}/> }
              { data.showSelectImageDialog && <SelectImageDialog ok={this.selectImageOk} cancel={this.selectImageCancel} uuid={this.selectImageDialogUuid}/> }
              { data.showSelectL3NetworkDialog && <SelectL3NetworkDialog ok={this.selectL3NetworkOk} cancel={this.selectL3NetworkCancel} uuid={this.selectL3NetworkDialogUuid}/> }
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
  };
}

const mapStateToProps = createStructuredSelector({
  dbInstanceOffering: selectDbInstanceOffering(),
  dbImage: selectDbImage(),
  dbL3Network: selectDbL3Network(),
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateVmDialog);