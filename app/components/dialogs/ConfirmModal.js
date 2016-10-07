import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import styles from './styles.css';

class ConfirmModal extends Component {
  render() {
    let { message, onConfirm, onCancel, data } = this.props

    if (!data.isShowing)
      return null;

    const CreateVmForm = require('./CreateVmForm').default

    return (
      <div className={styles.confirmModal}>
        <div>
          <div className={styles.modalBackdrop}></div>
          <div className={styles.confirmModalContent}>
            <CreateVmForm onSubmit={onCancel}/>
            <span className={styles.confirmModalMessage}>{message}</span>
            <input className={styles.confirmModalInput} type="text" ref={(_ref) => this.confirmInput = _ref}/>
            <button className={styles.btn} onClick={() => this.getTextAndConfirm()}>OK</button>
            <button className={styles.btn} onClick={() => onCancel()}>Cancel</button>
          </div>
        </div>
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