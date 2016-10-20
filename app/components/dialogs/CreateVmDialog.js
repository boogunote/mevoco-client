import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from './styles.css';
import { createStructuredSelector } from 'reselect';

import {
  updateWindow,
  destroyWindow
} from 'containers/App/windowActions';

import { selectWindow } from 'containers/App/selectors';

class CreateVmDialog extends Component {

  onClose = () => {
    this.props.destroyWindow(this.props.uuid);
    this.props.closeDialog();
  }

  onChangeName = (event) => {
    this.props.updateWindow(this.props.uuid, {
      name: event.target.value
    });
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
              <span className={styles.confirmModalMessage}>Test</span>
              <input className={styles.confirmModalInput} type="text" value={data.name} onChange={this.onChangeName}/>
              <button className={styles.btn}>OK</button>
              <button className={styles.btn} onClick={(event) => this.onClose(event)}>Cancel</button>
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
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(CreateVmDialog);