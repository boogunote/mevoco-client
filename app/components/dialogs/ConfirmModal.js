import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './styles.css';

class ConfirmModal extends Component {
  render() {
    let { message, onConfirm, onCancel, data } = this.props

    return (
      <div className={styles.confirmModal}>
        { data.isShowing &&
          <div>
            <div className={styles.modalBackdrop}></div>
            <div className={styles.confirmModalContent}>
              <span className={styles.confirmModalMessage}>{message}</span>
              <input className={styles.confirmModalInput} type="text" ref={(_ref) => this.confirmInput = _ref}/>
              <button className={styles.btn} onClick={() => this.getTextAndConfirm()}>OK</button>
              <button className={styles.btn} onClick={() => onCancel()}>Cancel</button>
            </div>
          </div>
        }
      </div>
    )
  }

  getTextAndConfirm() {
    let text = this.confirmInput.value
    this.props.onConfirm(text)
  }

}

const mapStateToComponent = (state) => {
  return {
    // isShowing: state.modals.isShowing
  }
}

export default connect(mapStateToComponent)(ConfirmModal)